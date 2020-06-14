#!/bin/bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# TODO: handle provisioning as well
#
# 1. install node and npm (does version matter?)
# 2. install docker
# 3. install docker host
# 4. install packer

# sudo apt-get install pandoc

# Dependencies
#
# cd $SCRIPT_DIR/../
npm install
npm run build
ln -sf $SCRIPT_DIR/aww.sh /usr/local/bin/aww

echo 'Aww yeah!';
echo 'You can now use the `aww` command from any directory';
echo 'Use `aww help` to get started';
