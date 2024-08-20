#!/bin/bash

export GIT_RESPOSITORY_URL="$GIT_RESPOSITORY_URL"

git clone "$GIT_RESPOSITORY_URL" /home/app/output

exec node script.js  