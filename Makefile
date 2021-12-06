VERSION = 0.0.10

build:
	docker build -t test-suite-automation:latest .

run:
	docker run \
		--env ONLY_TEST_THESE_DSNS='001f7b3b4d02,001f7b1e128d' \
		--env OBSERVR_RAILS='0739633A-0C07-4188-90B5-356D0EEAB88D' \
		--env ENV='qa'
		--env CUSTOMER_ID='4' \
		--env STORE_ID='6' \
		--env GATEWAY_HOST='10.0.0.62' \
		--env BOOTSTRAPSERVERS='10.0.0.62:30100' \
		test-suite-automation:latest

run-it:
	docker run -it \
		--env ONLY_TEST_THESE_DSNS='001f7b3b4d02,001f7b1e128d' \
		--env OBSERVR_RAILS='0739633A-0C07-4188-90B5-356D0EEAB88D' \
		--env ENV='qa'
		--env CUSTOMER_ID='4' \
		--env STORE_ID='6' \
		--env GATEWAY_HOST='10.0.0.62' \
		--env BOOTSTRAPSERVERS='10.0.0.62:30100' \
		test-suite-automation:latest  /bin/bash

run-slack:
	docker run \
		--env ONLY_TEST_THESE_DSNS='001f7b3b4d02,001f7b1e128d' \
		--env OBSERVR_RAILS='0739633A-0C07-4188-90B5-356D0EEAB88D' \
		--env CI_PIPELINE_ID='xxxxxxx' \
		--env SLACK_WEBHOOK_URL='https://hooks.slack.com/services/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' \
		--env ENV='qa'
		--env CUSTOMER_ID='4' \
		--env STORE_ID='6' \
		--env GATEWAY_HOST='10.0.0.62' \
		--env BOOTSTRAPSERVERS='10.0.0.62:30100' \
		test-suite-automation:latest
