#!/bin/bash

# ------------
# Run services
# ------------

b=$(tput bold)
n=$(tput sgr0)

DIR=$1
COMMAND=$2

# Gateway
echo
echo "${b}Gateway: ${n}"
cd $DIR/gateway-service;
./project-runner/run.sh dev $COMMAND;

# Frontend
echo
echo "${b}Frontend: ${n}"
cd $DIR/fe-application-loader;
# ./project-runner/run.sh dev $COMMAND;

# Seems like I have to run npm build and exports again (just tried and it seems to be working..)

# Auth
echo
echo "${b}Auth Service: ${n}"
cd $DIR/api-auth;
./project-runner/run.sh dev $COMMAND;

# Sign
echo
echo "${b}Signing Service: ${n}"
cd $DIR/Symfony2;
./project-runner/run.sh dev $COMMAND;

echo
echo "${b}Forms / Workflow service: ${n}"
cd $DIR/forms;
./project-runner/run.sh dev $COMMAND;

echo
echo "${b}Pdf / Eid service: ${n}"
cd $DIR/pdf-eid;
./project-runner/run.sh dev $COMMAND;

echo
echo "${b}Validator service: ${n}"
cd $DIR/validator;
./scripts/run.sh dev $COMMAND;

# Sepior Service
echo
echo "${b}Sepior Service: ${n}"
cd $DIR/SepiorService;
./project-runner/run.sh dev $COMMAND;

# -------------
# Post Commands
# -------------

# run the proxy so that the eid service can talk to NemId preprod environment when validating signatures

# echo "${b}Creating tunnel to get access to NemID pre-production environment: ${n}"
# ssh -D 172.17.42.1:50050 sign-sandbox #penneo_tunnel_nemid[sandbox]
