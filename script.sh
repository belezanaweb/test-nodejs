#!/bin/bash

case "$(uname -s)" in
  Darwin)
    echo 'Mac OS X'
    OS='darwin'
  ;;
  Linux)
    echo 'Linux'
    OS='linux'
  ;;
  *)
    echo 'Unsupported OS'
    exit 1
esac

case "$1" in
  dev)
    echo 'Starting dev...'
    export DEBUG=wbruno:*
    export NODE_PATH=$(pwd)/server/
    nodemon server/bin/www
  ;;
  test)
    echo 'Testing backend...'
    export DEBUG=wbruno:*
    export NODE_PATH=$(pwd)/server/
    nyc mocha test/**/**/*.js --exit
    eslint server/**/**/*.js
  ;;
  *)
    echo "Usage: {dev|test}"
    exit 1
  ;;
esac
