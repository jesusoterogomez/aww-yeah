#!/bin/bash

DIR=`readlink $0`
SCRIPT_DIR="$( cd "$( dirname "${DIR}" )" && pwd )"

cd "${SCRIPT_DIR}/../"

# echo ME        :  $ME
# echo Dir       : $DIR
# echo Script    : $SCRIPT_DIR
# echo PWD: `pwd`

npm run-script -- ${@:1}
