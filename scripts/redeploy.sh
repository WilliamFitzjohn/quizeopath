#!/usr/bin/env bash

LOCK_FILE="$(pwd)/quizeopath.lock"
cd /home/dietpi/Applications/quizeopath
flock -n $LOCK_FILE ./scripts/change-detector.sh >> /home/dietpi/Logs/deploy-quizeopath.log 2>&1
