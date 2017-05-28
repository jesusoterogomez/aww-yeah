#!/bin/bash

DIR=`readlink $0`
SCRIPT_DIR="$( cd "$( dirname "${DIR}" )" && pwd )"

# Run the task
cd "${SCRIPT_DIR}/../"
npm run-script -- ${@:1}
