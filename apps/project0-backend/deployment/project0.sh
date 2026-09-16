#!/usr/bin/env sh
###################################################################
#Script Name  : PROJECT0_AUTO
#Description  : Automation script to pull git repository, build and deploy to kubernetes cluster
#Args         :
#Author       : Le Tam An
#Email        : tamanle23@gmail.com
###################################################################
#Start import external scripts
. ./lib/common.sh
#End import
set -ue # Strict mode For POSIX-compliant shell scripts.

TEMP_WORK_SPACE=$(mktemp -d)
BASE_DIR=$(dirname "$0")
CURR_DIR=$PWD

while getopts ":g:" o; do
      case "${o}" in
          g)
              GIT_REVISION=${OPTARG}
              ;;
          *)
              echo ${getopt}
              ;;
      esac
done

usage() { echo "Usage: $0 [-g <string>: git revision]" 1>&2; }

printParameters() {
  echo "********************************"
  echo "* TEMP_WORK_SPACE=${TEMP_WORK_SPACE}"
  echo "* BASE_DIR=${BASE_DIR}"
  echo "* CURR_DIR=${CURR_DIR}"
  echo "* KUBE_CONFIG=${KUBE_CONFIG:-}"
  echo "* KUBE_CONFIG_CONTEXT=${KUBE_CONFIG_CONTEXT:-}"
  echo "* GIT_URL=${GIT_URL:-}"
  echo "* GIT_BRANCH=${GIT_BRANCH:-}"
  echo "* GIT_REVISION=${GIT_REVISION:-}"
  echo "********************************"
}

validateParameters() {
    if [ -z "${GIT_URL:-}" ]; then
    usage; exit 1;
    fi
}

main() {
  ##########START##########
  #Read parameters
  dotenv
  printParameters
  validateParameters

  export KUBECONFIG=${KUBE_CONFIG}
  kubectl config use-context ${KUBE_CONFIG_CONTEXT}

  #kubectl get nodes
  #echo "#kubectl# Current context=$(kubectl config --kubeconfig="${KUBE_CONFIG}" current-context)"


  cd ${TEMP_WORK_SPACE}
  git clone --recurse-submodules ${GIT_URL} --branch ${GIT_BRANCH} ./
  if [ ! -z "${GIT_REVISION:-}" ]; then
    echo "Checkout revision"
    git submodule foreach git checkout ${GIT_REVISION}
    git checkout ${GIT_REVISION}
  else
    git submodule foreach git checkout ${GIT_BRANCH}
    git checkout ${GIT_BRANCH}
  fi
  mvn clean install
  ##########END##########
}

clean() {
  rm -rf $TEMP_WORK_SPACE
}


main #|| clean;exit 0;
#clean
