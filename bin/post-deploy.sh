#!/usr/bin/env bash
# Enables checking of all commands
set -e

mkdir -p ./logs
# start pm2
./node_modules/.bin/pm2 startOrGracefulReload process.json

echo "====> $0 EXECUTE OVER <===="
