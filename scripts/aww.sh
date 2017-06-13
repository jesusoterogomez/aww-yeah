#!/bin/bash

DIR=`readlink $0`
SCRIPT_DIR="$( cd "$( dirname "${DIR}" )" && pwd )"

# Run the task
cd "${SCRIPT_DIR}/../"

# NVM
# ===
#
# Performance Note:
# ----------------
#
# Using nvm as follows is expensive.  On an X1 carbon, run time cost is:
#
# - loading nvm in the shell      : ~ .4 secs
# - switching to specific version : ~ .5 secs
#
# Save some time by setting version in .nvmrc as the default version
#
# Load nvm (if not loaded)
# ------------------------
#
export NVM_DIR="$HOME/.nvm"
which nvm || [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
#
# Use specific version (if not default)
# -------------------------------------
#
if [ `nvm current` != `echo -n $(cat .nvmrc)` ]; then
    nvm use > /dev/null
fi

npm run-script -- ${@:1}
