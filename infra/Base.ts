import * as awsx from '@pulumi/awsx';
import * as pulumi from '@pulumi/pulumi';
import * as aws from '@pulumi/aws';
import * as random from '@pulumi/random';

export const preName = (name: string) => `${pulumi.getStack()}-${name}`;

export type TagsInput = {
  environment: string;
};

export type Tags = { [key: string]: string };

export const createTags = ({ environment }: TagsInput): Tags => {
  return {
    Environment: environment,
  };
};

type NetworkResult = {
  vpc: awsx.ec2.Vpc;
  publicSubnetIds: pulumi.Output<string[]>;
  privateSubnetIds: pulumi.Output<string[]>;
};
export const getSubnets = (vpcId: pulumi.Input<string>) => (): NetworkResult => {
  const vpc = new awsx.ec2.Vpc(preName('vpc'), {
    vpc: aws.ec2.Vpc.get(preName('vcp-t'), vpcId),
  });

  const allSubnetsIds = vpc.id.apply((vpcId) =>
    aws.ec2.getSubnetIds({
      vpcId: vpcId,
    })
  );

  const subnetsResult = allSubnetsIds.ids.apply((ids) =>
    ids.map((id) => aws.ec2.getSubnet({ id }))
  );

  const publicSubnetIds = subnetsResult.apply((subnets) =>
    Promise.all(subnets).then((subnets) =>
      subnets.filter((subnet) => subnet.mapPublicIpOnLaunch).map((subnet) => subnet.id)
    )
  );

  const privateSubnetIds = subnetsResult.apply((subnets) =>
    Promise.all(subnets).then((subnets) =>
      subnets.filter((subnet) => !subnet.mapPublicIpOnLaunch).map((subnet) => subnet.id)
    )
  );

  return {
    vpc,
    publicSubnetIds,
    privateSubnetIds,
  };
};

type CreateClusterResult = NetworkResult & {
  cluster: awsx.ecs.Cluster;
};
export const createCluster =
  (tags: Tags) =>
  (input: NetworkResult): CreateClusterResult => ({
    ...input,
    cluster: new awsx.ecs.Cluster(preName('cluster'), { vpc: input.vpc, tags }),
  });

type GetLoadBalancerListenerInput = {
  healthCheckPath?: string;
  targetPort?: number;
  loadBalancerArn: pulumi.Input<string>;
  certificateArn: string;
};
type LoadBalancerResponse = CreateClusterResult & {
  web: awsx.elasticloadbalancingv2.ApplicationListener;
};
export const getLoadBalancerListener =
  (tags: Tags) =>
  ({
    healthCheckPath = '/',
    targetPort = 4000,
    loadBalancerArn,
    certificateArn,
  }: GetLoadBalancerListenerInput) =>
  (input: CreateClusterResult): LoadBalancerResponse => {
    const lb = aws.lb.LoadBalancer.get(preName('app-lb-x'), loadBalancerArn);
    const alb = new awsx.elasticloadbalancingv2.ApplicationLoadBalancer(preName('app-lb'), {
      loadBalancer: lb,
    });

    const atg = alb.createTargetGroup(preName('app-tg'), {
      port: targetPort,
      deregistrationDelay: 0,
      protocol: 'HTTP',
      healthCheck: {
        path: healthCheckPath,
      },
      tags,
    });

    const web = atg.createListener(preName('app-listener'), {
      port: 443,
      protocol: 'HTTPS',
      certificateArn,
    });

    return {
      ...input,
      web,
    };
  };

type FargatePolicyReponse = LoadBalancerResponse & {
  fargatePolicy: aws.iam.Policy;
  gitlabSecretArn: pulumi.Output<string>;
};
export const createFargatePolicy =
  (tags: Tags) =>
  (gitlabSecretArn: pulumi.Output<string>) =>
  (input: LoadBalancerResponse): FargatePolicyReponse => {
    const fargatePolicy = new aws.iam.Policy(preName('fargate-policy'), {
      policy: gitlabSecretArn.apply((gitlabSecretArn: string) =>
        JSON.stringify({
          Version: '2012-10-17',
          Statement: [
            {
              Effect: 'Allow',
              Action: ['kms:Decrypt', 'secretsmanager:GetSecretValue'],
              Resource: [gitlabSecretArn, 'arn:aws:kms:us-east-1:963654403471:*'],
            },
          ],
        })
      ),
      tags,
    });

    return {
      ...input,
      gitlabSecretArn,
      fargatePolicy,
    };
  };

type FargateRoleResponse = FargatePolicyReponse & {
  fargateRole: aws.iam.Role;
};
export const createFargateRole =
  (tags: Tags) =>
  (input: FargatePolicyReponse): FargateRoleResponse => {
    const fargateRole = new aws.iam.Role(preName('fargate-role'), {
      assumeRolePolicy: JSON.stringify({
        Version: '2012-10-17',
        Statement: [
          {
            Sid: '',
            Effect: 'Allow',
            Principal: {
              Service: 'ecs-tasks.amazonaws.com',
            },
            Action: 'sts:AssumeRole',
          },
        ],
      }),
      managedPolicyArns: [
        input.fargatePolicy.arn,
        'arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy',
      ],
      tags,
    });
    return {
      ...input,
      fargateRole,
    };
  };

type FargateServiceParams = {
  image: string;
  desiredCount?: number;
  memory?: number;
  cpu?: number;
  environment?: pulumi.Input<awsx.ecs.KeyValuePair[]>;
};
export const createFargateService =
  (tags: Tags) =>
  ({ image, desiredCount = 2, memory = 1024, cpu = 512, environment }: FargateServiceParams) =>
  (input: FargateRoleResponse) => {
    const fargateService = new awsx.ecs.FargateService(preName('next'), {
      cluster: input.cluster,
      desiredCount,
      forceNewDeployment: true,
      subnets: input.privateSubnetIds,
      assignPublicIp: false,
      healthCheckGracePeriodSeconds: 30,
      taskDefinitionArgs: {
        executionRole: input.fargateRole,
        containers: {
          next: {
            image,
            repositoryCredentials: input.gitlabSecretArn.apply((gitlabSecretArn: string) => ({
              credentialsParameter: gitlabSecretArn,
            })),
            memory,
            cpu,
            portMappings: [input.web],
            environment,
          },
        },
      },
      tags,
    });
    return {
      ...input,
      fargateService,
    };
  };
