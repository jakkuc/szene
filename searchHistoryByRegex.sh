#!/bin/bash

toSearchFor=$1;

git log -p --pickaxe-regex -S"$toSearchFor" | grep -E -e "$toSearchFor" -e "commit" -e "\+\+\+"
