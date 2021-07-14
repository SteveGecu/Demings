# Rovr Test Automation

A Jest test suite for testing Rovr functionalities

#### Client

connections and subscriptions are builded in this folder seperated by confluent and gateway

#### Confluent:

    tests against confluent connections
    each topic needs a connection method

#### Gateway

    tests against gateway
    each application in gateway need a connection method
    each topic needs a connection method

#### Tests

    ### Confluent: tests against confluent
    ### Gateway: tests against gateway apps
    ### Testfiles can be in sync with epic stories, tes cases can be in sync with stories
    ### Kafka Message tests
        https://spacee.atlassian.net/wiki/spaces/DEM/pages/47906828/Example+Messages#drone.logs

#### Deming Test Automation project aimes to test all available cases for Deming services

which includes ROVR, OBSERVR and RANGR products / drones.

#### General Strategie is to mimic a real environment; we call it QA ENVIRONMENT

and run the drones. Automation will test the output data which will be created by these
drones actions.

Test Automation will test functions and events.

Test Automation will use Kafka Messages as function / event results.

Programming Language: JavaScript

Test Lybrary: Jest

Kafka Lybrary: Kafka.js, Kafkacat

Api Calls: JavaScript
