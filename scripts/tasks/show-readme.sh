#!/bin/bash

(echo 'Showing readme.. ' && pandoc -f markdown_github -t plain README.md) | less
