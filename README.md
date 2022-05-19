# Front Backoffice

[Tested](tested.cl)

## Getting Started

...in construction...

## Docker Build

### Login

```bash
docker login registry.gitlab.com
Username: ${TOKEN_NAME}
Password: ${TOKEN}
```

### Build Image

```bash
docker build --build-arg STAGE=dev --build-arg PORT=3000 --build-arg CI_JOB_TOKEN=${CI_JOB_TOKEN} -t registry.gitlab.com/grupo95/front-backoffice:${VERSION} .
```

### Run Image local

```bash
docker run -p 3000:3000 registry.gitlab.com/grupo95/front-backoffice:${VERSION}
```

To stop the image:

```bash
docker ps

docker stop ${ID}
```

### Push Image

A gitlab token must be generated with `read_registry` y `write_registry` scopes.

- Push

```bash
docker push registry.gitlab.com/grupo95/front-backoffice
```

## Pulumi

### Primera vez

1. Create a S3 bucket to storage the pulumi stacks files.
2. Login into pulumi

```bash
pulumi login s3://${BUCKET_NAME}
```

3. Create pulumi stack for the first time, for each environment:

```bash
pulumi stack init
```

Add the region

```bash
pulumi config set aws:region ${REGION}
```

For the base case (this is already created):

- `BUCKET_NAME=bucket-name-pulumi-infra`
- `REGION=us-east-1`

4. Deploy pulumi: pass `GITLAB_USERNAME`, `GITLAB_PASSWORD` and `DOCKER_IMAGE`:

```bash
GITLAB_USERNAME=${GITLAB_USENAME} GITLAB_PASSWORD=${TOKEN} DOCKER_IMAGE=registry.gitlab.com/grupo95/front-backoffice:${VERSION} pulumi up
```

If you get a warning about `passphrase`, declare the `PULUMI_CONFIG_PASSPHRASE` variable as empty:

```bash
export PULUMI_CONFIG_PASSPHRASE=
```
