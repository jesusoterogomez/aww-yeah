#!/bin/bash

DIR=`readlink $0`
SCRIPT_DIR="$( cd "$( dirname "${DIR}" )" && pwd )"

# Run the task
cd "${SCRIPT_DIR}/../"

# Call the built distributable and forward all positional arguments
node './dist/index.js' -- ${@:1}

