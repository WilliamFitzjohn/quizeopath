#!/usr/bin/env bash

LOCK_FILE="$(pwd)/quizeopath-backend.lock"
cd /home/dietpi/Applications/quizeopath-backend
flock -n $LOCK_FILE ./scripts/change-detector.sh >> /home/dietpi/Logs/deploy-quizeopath-backend.log 2>&1
