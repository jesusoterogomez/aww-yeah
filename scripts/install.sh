#!/bin/bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $SCRIPT_DIR/../

./scripts/provision/run.sh

# Dependencies
#
npm install

ln -sf $SCRIPT_DIR/aww.sh /usr/local/bin/aww
