#!/bin/bash

set -e
set -x

ng build --prod

DOCKER_CONTAINER_NAME=nginx-recipes

docker build -t $DOCKER_CONTAINER_NAME .
