#!/bin/bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $SCRIPT_DIR;

OS="`uname`"
case $OS in
    'Linux')
        ./linux.sh
        ;;
    'Darwin')
        echo 'Provisioning not implemented for MAC'
        ;;
    *) ;;
esac
