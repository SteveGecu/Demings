VERSION = 0.0.3

build:
	docker build -t test-suite-automation:latest .

run-qa:
	docker run -it --env ENV='qa'  --env STORE_ID='6' --env CUSTOMER_ID='1' --env OBSERVR_RAILS='0739633A-0C07-4188-90B5-356D0EEAB88D' test-suite-automation:latest /bin/bash

#  --env SLACK_WEBHOOK_URL='https://hooks.slack.com/services/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'