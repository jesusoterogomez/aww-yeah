#!/bin/bash

# ------------
# Run services
# ------------

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $SCRIPT_DIR;
source ./../utils/text.sh

# @fixme: update the description based on the $COMMAND and the $SERVICE if selected
h1 "SERVICES : Running penneo services"
h2 "Starting / Stopping one or more services"

DIR=$1
COMMAND=$2

h3 Gateway:
cd $DIR/gateway-service;
./project-runner/run.sh dev $COMMAND;

h3 Frontend:
cd $DIR/fe-application-loader;
# ./project-runner/run.sh dev $COMMAND;

# Seems like I have to run npm build and exports again (just tried and it seems to be working..)

h3 Auth Service:
cd $DIR/api-auth;
./project-runner/run.sh dev $COMMAND;

h3 Signing Service:
cd $DIR/Symfony2;
./project-runner/run.sh dev $COMMAND;

h3 Forms / Workflow service:
cd $DIR/forms;
./project-runner/run.sh dev $COMMAND;

h3 Pdf / Eid service:
cd $DIR/pdf-eid;
./project-runner/run.sh dev $COMMAND;

h3 Validator service:
cd $DIR/validator;
./scripts/run.sh dev $COMMAND;

h3 Sepior Service:
cd $DIR/SepiorService;
./project-runner/run.sh dev $COMMAND;

# -------------
# Post Commands
# -------------

# run the proxy so that the eid service can talk to NemId preprod environment when validating signatures

# h3 Creating tunnel to get access to NemID pre-production environment:
# ssh -D 172.17.42.1:50050 sign-sandbox #penneo_tunnel_nemid[sandbox]
