#!/usr/bin/env sh
###################################################################
#Script Name  : PROJECT0_AUTO
#Description  : Automation script to pull git repository, build and deploy to kubernetes cluster
#Args         :
#Author       : Le Tam An
#Email        : tamanle23@gmail.com
###################################################################
set -ue # Strict mode For POSIX-compliant shell scripts.

dotenv() {
  PROVIDER=$1
  PROJECT=$2
  PROFILE=$3
  if [ -f .env ]
  then
    # export $(cat .env | xargs)
    export $(grep -v '^#' ${BASE_DIR}/environments/.env | xargs)
    # if [ !-z "${PROVIDER:-}" ]; then
      export $(grep -v '^#' ${BASE_DIR}/environments/${PROVIDER}-${PROJECT}-${PROFILE}.env | xargs)
    # fi
  fi
}
