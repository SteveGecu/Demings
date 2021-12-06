VERSION = 0.0.7

build:
	docker build -t test-suite-automation:latest .

run-qa:
	docker run -it --env ENV='qa' --env ONLY_TEST_THESE_DSNS='001f7b3b4d02,001f7b1e128d' --env STORE_ID='6' --env CUSTOMER_ID='4' --env OBSERVR_RAILS='0739633A-0C07-4188-90B5-356D0EEAB88D' test-suite-automation:latest /bin/bash

run:
	docker run -it --env CI_PIPELINE_ID='1234567890' --env SLACK_WEBHOOK_URL='https://hooks.slack.com/services/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' --env ENV='qa'  --env STORE_ID='6' --env CUSTOMER_ID='1' --env OBSERVR_RAILS='0739633A-0C07-4188-90B5-356D0EEAB88D' test-suite-automation:latest /bin/bash

#  --env SLACK_WEBHOOK_URL='https://hooks.slack.com/services/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'
#  --env ONLY_TEST_THESE_DSNS='001f7b3b4d02,001f7b1e128d'