import * as R from 'ramda';
import * as pulumi from '@pulumi/pulumi';

import {
  createTags,
  createCluster,
  getSubnets,
  getLoadBalancerListener,
  createFargatePolicy,
  createFargateRole,
  createFargateService,
} from './Base';
const { version: dockerImageVersion } = require('../package.json');

const config = new pulumi.Config();
const environment = config.require('environment');
const dockerImage = config.require('docker-image');
const dockerImageStage = environment === 'prod' ? '' : `-${config.require('docker-image-stage')}`;
const stackReference = new pulumi.StackReference(`backoffice-${environment}`);
const loadBalancerArn = stackReference.getOutput('loadBalancerArn').apply((id) => String(id));
const vpcId = stackReference.getOutput('vpcId').apply((id) => String(id));
const gitlabSecretArn = stackReference
  .getOutput('gitlabCredentialsSecret')
  .apply((id) => String(id));
const baseTags = createTags({ environment });

const createFargate = R.pipe(
  getSubnets(vpcId),
  createCluster(baseTags),
  getLoadBalancerListener(baseTags)({
    loadBalancerArn,
    targetPort: 3000,
    certificateArn: process.env.CERTIFICATE_ARN!,
  }),
  createFargatePolicy(baseTags)(gitlabSecretArn),
  createFargateRole(baseTags),
  createFargateService(baseTags)({
    image: `${dockerImage}:${dockerImageVersion}${dockerImageStage}`,
    environment: [{ name: 'STAGE', value: environment === 'rc' ? 'staging' : environment }],
  })
);

const result = createFargate();

export const hostname = result.web.endpoint.hostname;
