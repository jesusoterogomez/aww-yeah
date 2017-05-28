#!/bin/bash

# ------------
# Run services
# ------------

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $SCRIPT_DIR;
source ./../lib/text.sh

# @fixme: update the description based on the $COMMAND and the $SERVICE if selected
h1 "SERVICES : Running penneo services"
h2 "Starting / Stopping one or more services"

./service.js $@
