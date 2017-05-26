#!/bin/bash

function linux-docker-ip () {
	  ifconfig | grep --color=auto --exclude-dir={.bzr,CVS,.git,.hg,.svn} docker0 -A1 | tail -1 | grep --color=auto --exclude-dir={.bzr,CVS,.git,.hg,.svn} -E -o '([0-9.]*)' | head -1
}

function mac-docker-ip () {
    echo 'MacOS setup is not supported yet. I need your help to figure this out.. so ping me .. Awww yeaah!'
    exit -1;
}

function docker-ip () {
    OS="`uname`"
    case $OS in
        'Linux')
            linux-docker-ip
            ;;
        'Darwin')
            mac-docker-ip
            ;;
        *) ;;
    esac
}

docker-ip
