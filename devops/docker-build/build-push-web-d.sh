#!/bin/bash

d=../..

pushd $d

IMAGE_NAME=bigthink/docker-repository:spacetokens-web-dev-latest
REACT_APP_API_URL=https://api-d.spacetokens.io/spacetokens/v1
REACT_APP_API_KEY=8d9484cccba247f0b4ba051f35357116
REACT_APP_SCAN_URL=https://explorer.cardano-testnet.iohkdev.io/en/transaction?id=
REACT_APP_GA_SITE_TAG=UA-158039780-3
REACT_APP_FB_SITE_TAG=2655802618054127

if docker build --build-arg REACT_APP_API_URL=$REACT_APP_API_URL --build-arg REACT_APP_API_KEY=$REACT_APP_API_KEY --build-arg REACT_APP_SCAN_URL=$REACT_APP_SCAN_URL --build-arg REACT_APP_GA_SITE_TAG=$REACT_APP_GA_SITE_TAG --build-arg REACT_APP_FB_SITE_TAG=$REACT_APP_FB_SITE_TAG -t $IMAGE_NAME . ; then
  docker push $IMAGE_NAME
else
  echo "error building and/or pushing docker image"
fi

popd
