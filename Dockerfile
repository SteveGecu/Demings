FROM node:17.0.1-alpine3.14

RUN apk update
RUN apk add --no-cache --update \
    jq \
    curl \
    bash \
    gawk \
    kafkacat \
    libxml2-utils

ENV TEST_ENVIRONMENT=orchestrator
ENV KCAT_CONFIG=~/.config/kafkacatorchestrator.conf
ENV GATEWAY_USERNAME=admin-user
ENV GATEWAY_PASSWORD=kafkapassword
ENV GATEWAY_SSL_CA_LOCATION=/app/ca.crt
ENV GATEWAY_GROUP_ID=admin-group
ENV CONFLUENT_URL=pkc-ldvmy.centralus.azure.confluent.cloud:9092
ENV CONFLUENT_USERNAME=HUASROLBSYNXS7RI
ENV CONFLUENT_PASSWORD=8NTIVcEgnHxBLwDLWrGA2xVLUNVW/BkdLYj+08cYFYoF9TaUAlf2LOHyKacqyQzx
ENV KAFKAJS_LOG_LEVEL=warn
ENV NUM_THREADS=1
ENV NUM_UPLOADS=1
ENV UPLOAD_INTERVAL_SEC=120
ENV SECURITYPROTOCOL=SASL_SSL
ENV SASLMECHANISMS=SCRAM-SHA-512
ENV SASLUSERNAME=admin-user
ENV SASLPASSWORD=kafkapassword

# ENV GATEWAY_HOST=10.16.159.185
# ENV BOOTSTRAPSERVERS=10.16.159.185:30100
ENV GATEWAY_HOST=mosquitto
ENV BOOTSTRAPSERVERS=strimzi-kafka-bootstrap:9092

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm install .

COPY ./Deming/ ./Deming/
COPY ./jest.config.js .
COPY ./orchestrator.js .
COPY ./orchestrator_run.sh .

RUN ln -s /usr/bin/kafkacat /usr/bin/kcat

CMD [ "/bin/bash", "./orchestrator_run.sh" ]