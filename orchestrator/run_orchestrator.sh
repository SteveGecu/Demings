#!/bin/bash

mkdir ~/.config

echo "Writing kafka config to ~/.config/kafkacatorchestrator.conf"
echo "bootstrap.servers=${BOOTSTRAPSERVERS}" > ~/.config/kafkacatorchestrator.conf
echo "security.protocol=SASL_SSL" >> ~/.config/kafkacatorchestrator.conf
echo "sasl.mechanisms=${SASLMECHANISMS}" >> ~/.config/kafkacatorchestrator.conf
echo "sasl.username=${SASLUSERNAME}" >> ~/.config/kafkacatorchestrator.conf
echo "sasl.password=${SASLPASSWORD}" >> ~/.config/kafkacatorchestrator.conf
echo "enable.ssl.certificate.verification=false" >> ~/.config/kafkacatorchestrator.conf

node orchestrator.js