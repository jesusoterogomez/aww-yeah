#!/bin/bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# TODO: handle provisioning as well
#
# 1. install node and npm (does version matter?)
# 2. install docker
# 3. install docker host
# 4. install packer


ln -s $SCRIPT_DIR/aww.sh /usr/local/bin/aww
