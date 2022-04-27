#!/bin/bash

d=../..

pushd $d

IMAGE_NAME=bigthink/docker-repository:spacetokens-web-production-latest
REACT_APP_API_URL=https://api.spacetokens.io/spacetokens/v1
REACT_APP_API_KEY=157058251b0f47ec975ff2213ddd7853
REACT_APP_SCAN_URL=https://explorer.cardano.org/en/transaction?id=
REACT_APP_GA_SITE_TAG=UA-158039780-2
REACT_APP_FB_SITE_TAG=554281505767427

if docker build --build-arg REACT_APP_API_URL=$REACT_APP_API_URL --build-arg REACT_APP_API_KEY=$REACT_APP_API_KEY --build-arg REACT_APP_SCAN_URL=$REACT_APP_SCAN_URL --build-arg REACT_APP_GA_SITE_TAG=$REACT_APP_GA_SITE_TAG --build-arg REACT_APP_FB_SITE_TAG=$REACT_APP_FB_SITE_TAG -t $IMAGE_NAME . ; then
  docker push $IMAGE_NAME
else
  echo "error building and/or pushing docker image"
fi

popd
