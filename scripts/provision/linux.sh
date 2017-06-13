#!/bin/bash

# 2. install docker
# 3. install docker host
# 4. install packer

sudo apt-get install pandoc

# NVM
# ---
#
# download
#
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash
#
# load
#
export NVM_DIR="$HOME/.nvm"
which nvm || [ -s "$NVM_DIR/nvm.sh" ] && \
    echo "loading NVM libs.." && \
    \. "$NVM_DIR/nvm.sh" # This loads nvm
#
# install
#
VER=`echo -n $(cat ../../.nvmrc)`
echo "Installing $VER.."
nvm install $VER

