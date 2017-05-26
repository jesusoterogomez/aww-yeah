#!/bin/bash

# set -e
# set -x

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $SCRIPT_DIR;

source ./../scripts/text.sh

IP=`./docker-ip.sh`
DOMAIN=dev.penneo.com

h1 "DNS : Update local host to recognize domain name: $DOMAIN"
h2 "Setting up your hosts file. This will make it possible for you to open your browser and open the Penneo application with $DOMAIN"


# @fixme: refactor this so that grep doesn't return -1 if no match is found.
# This way we can return a status for the whole script at the end
FOUND=`grep '[^.]dev.penneo.com' /etc/hosts > /dev/null && echo 1`
if [ -z $FOUND ]; then
    echo $IP dev.penneo.com | sudo tee -a /etc/hosts
else
    notice "An entry for dev.penneo.com already exists.."
fi

