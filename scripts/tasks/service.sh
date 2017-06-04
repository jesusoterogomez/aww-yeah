#!/bin/bash
# @todo: this script goes away. The entry point is services.js

# ------------
# Run services
# ------------

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $SCRIPT_DIR;
source ./../lib/text.sh

h1 "DEPPRECATED"
h1 "SERVICES : Running penneo services"
h2 "Starting / Stopping one or more services"

# if [ -z $DIR ]; then

if [ -z $1 ]; then
  error "No service specified. Use 'all' for starting/stopping all services."
  exit -1;
fi

./service.js $@
