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

# if [ -z $DIR ]; then

if [ -z $1 ]; then
  error "No service specified. Use 'all' for starting/stopping all services."
  exit -1;
fi

./service.js $@
