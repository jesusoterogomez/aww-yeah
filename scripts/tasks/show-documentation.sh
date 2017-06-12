#!/bin/bash

(echo 'Generating documentation .. ' && pandoc -f html -t plain $1) | less
