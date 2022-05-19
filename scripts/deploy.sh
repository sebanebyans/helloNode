#!/bin/sh

echo $STAGE

export PULUMI_CONFIG_PASSPHRASE=
export PATH=$PATH:$HOME/.pulumi/bin

pulumi login s3://$BUCKET_NAME

pulumi stack ls

pulumi stack select $PULUMI_STACK

pulumi up -y