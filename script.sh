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
  start)
    echo 'Starting...'
    export NODE_PATH=$(pwd)/server/
    node server/bin/www
  ;;
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
  ;;
  *)
    echo "Usage: {start|dev|test}"
    exit 1
  ;;
esac
