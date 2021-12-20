#!/bin/bash

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33'
NC='\033[0m'

mode=${1:-remote}

echo "Mode: ${mode}"

if [[ $mode == 'local' ]]
then
    echo -e "${YELLOW} This script is running in local mode, with preset variables${NC}"
    echo "Assuming 'qa-stressTest' is the target environment"

    echo "Updating npm dependencies"
    npm install

    echo "Loading environment variables"
    envFile="./environments/qa-stressTest.env"
    export $(grep -v '^#' $envFile | xargs)
    export ENV='qa'
    export CUSTOMER_ID='4'
    export STORE_ID='6'

    # Update these lines (or comment them out) to configure which drones get tested
    export OBSERVR_RAILS='0739633A-0C07-4188-90B5-356D0EEAB88D'
    export ONLY_TEST_THESE_DSNS='001f7b3b4d02,001f7b3b4b5a'
fi

exit 0

echo "Creating ~/.config directory if it does not exist"
mkdir ~/.config

echo "Writing kafka config to ~/.config/kafkacatorchestrator.conf"
echo "bootstrap.servers=${BOOTSTRAPSERVERS}" > ~/.config/kafkacatorchestrator.conf
echo "security.protocol=SASL_SSL" >> ~/.config/kafkacatorchestrator.conf
echo "sasl.mechanisms=${SASLMECHANISMS}" >> ~/.config/kafkacatorchestrator.conf
echo "sasl.username=${SASLUSERNAME}" >> ~/.config/kafkacatorchestrator.conf
echo "sasl.password=${SASLPASSWORD}" >> ~/.config/kafkacatorchestrator.conf
echo "enable.ssl.certificate.verification=false" >> ~/.config/kafkacatorchestrator.conf

node orchestrator.js