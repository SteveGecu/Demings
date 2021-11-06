const fetch = require("node-fetch");
require('dotenv').config();
const elasticURL = process.env.ELASTIC_URL
let username = 'elastic';
let password = 'tlvtACRv9JLkDn1AFFOWmdQF';

async function getRovrLogs(dsn) {
    const response = await fetch(elasticURL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Basic ZWxhc3RpYzp0bHZ0QUNSdjlKTGtEbjFBRkZPV21kUUY='
        },
        body: JSON.stringify(
            {
                "_source": [
                    "mqtt.topic",
                    "parsedJson.data.dsn",
                    "parsedJson.data.message",
                    "message",
                    "@timestamp"
                ],
                "size": 1,
                "from": 0,
                "query": {
                    "bool": {
                        "must": [
                            {
                                "range": {
                                    "@timestamp": {
                                        "gte": "now-5m"
                                    }
                                }
                            },
                            {
                                "match": {
                                    "mqtt.topic":
                                        "rovr/log"
                                }
                            },
                            {
                                "match": {
                                    "parsedJson.data.dsn": dsn
                                }
                            }
                        ]
                    }
                }
            }
        )
    })
    return {
        body: await response.json(),
        status: response.status,
        headers: response.statusText
    }
}

async function getRovrRunReport(dsn) {
    const response = await fetch(elasticURL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Basic ZWxhc3RpYzp0bHZ0QUNSdjlKTGtEbjFBRkZPV21kUUY='
        },
        body: JSON.stringify(
            {
                "_source": [
                    "mqtt.topic",
                    "parsedJson.data.provisioning.dsn",
                    "message",
                    "@timestamp"
                ],
                "size": 1,
                "from": 0,
                "query": {
                    "bool": {
                        "must": [
                            {
                                "range": {
                                    "@timestamp": {
                                        "gte": "now-60m"
                                    }
                                }
                            },
                            {
                                "match": {
                                    "mqtt.topic":
                                        "rovr/report/run"
                                }
                            },
                            {
                                "match": {
                                    "parsedJson.data.provisioning.dsn": dsn
                                }
                            }
                        ]
                    }
                }
            }
        )
    })
    return {
        body: await response.json(),
        status: response.status,
        headers: response.statusText
    }
}

async function getRovrTelemetryReport(dsn) {
    const response = await fetch(elasticURL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Basic ZWxhc3RpYzp0bHZ0QUNSdjlKTGtEbjFBRkZPV21kUUY='
        },
        body: JSON.stringify(
            {
                "_source": [
                    "mqtt.topic",
                    "parsedJson.data.provisioning.dsn",
                    "message",
                    "@timestamp"
                ],
                "size": 1,
                "from": 0,
                "query": {
                    "bool": {
                        "must": [
                            {
                                "range": {
                                    "@timestamp": {
                                        "gte": "now-5m"
                                    }
                                }
                            },
                            {
                                "match": {
                                    "mqtt.topic":
                                        "rovr/report/telemetry"
                                }
                            },
                            {
                                "match": {
                                    "parsedJson.data.provisioning.dsn": dsn
                                }
                            }
                        ]
                    }
                }
            }
        )
    })
    return {
        body: await response.json(),
        status: response.status,
        headers: response.statusText
    }
}

async function getObservrLogs(dsn) {
    const response = await fetch(elasticURL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Basic ZWxhc3RpYzp0bHZ0QUNSdjlKTGtEbjFBRkZPV21kUUY='
        },
        body: JSON.stringify(
            {
                "_source": [
                    "mqtt.topic",
                    "parsedJson.data.dsn",
                    "parsedJson.data.message",
                    "message",
                    "@timestamp"
                ],
                "size": 1,
                "from": 0,
                "query": {
                    "bool": {
                        "must": [
                            {
                                "range": {
                                    "@timestamp": {
                                        "gte": "now-5m"
                                    }
                                }
                            },
                            {
                                "match": {
                                    "mqtt.topic":
                                        "observr/log"
                                }
                            },
                            {
                                "match": {
                                    "parsedJson.data.dsn": dsn
                                }
                            }
                        ]
                    }
                }
            }
        )
    })
    return {
        body: await response.json(),
        status: response.status,
        headers: response.statusText
    }
}

async function getObservrRunReport(dsn) {
    const response = await fetch(elasticURL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Basic ZWxhc3RpYzp0bHZ0QUNSdjlKTGtEbjFBRkZPV21kUUY='
        },
        body: JSON.stringify(
            {
                "_source": [
                    "mqtt.topic",
                    "parsedJson.data.provisioning.dsn",
                    "message",
                    "@timestamp"
                ],
                "size": 1,
                "from": 0,
                "query": {
                    "bool": {
                        "must": [
                            {
                                "range": {
                                    "@timestamp": {
                                        "gte": "now-60m"
                                    }
                                }
                            },
                            {
                                "match": {
                                    "mqtt.topic":
                                        "observr/report/run"
                                }
                            },
                            {
                                "match": {
                                    "parsedJson.data.provisioning.dsn": dsn
                                }
                            }
                        ]
                    }
                }
            }
        )
    })
    return {
        body: await response.json(),
        status: response.status,
        headers: response.statusText
    }
}

async function getObservrTelemetryReport(dsn) {
    const response = await fetch(elasticURL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Basic ZWxhc3RpYzp0bHZ0QUNSdjlKTGtEbjFBRkZPV21kUUY='
        },
        body: JSON.stringify(
            {
                "_source": [
                    "mqtt.topic",
                    "parsedJson.data.provisioning.dsn",
                    "message",
                    "@timestamp"
                ],
                "size": 1,
                "from": 0,
                "query": {
                    "bool": {
                        "must": [
                            {
                                "range": {
                                    "@timestamp": {
                                        "gte": "now-5m"
                                    }
                                }
                            },
                            {
                                "match": {
                                    "mqtt.topic":
                                        "observr/report/telemetry"
                                }
                            },
                            {
                                "match": {
                                    "parsedJson.data.provisioning.dsn": dsn
                                }
                            }
                        ]
                    }
                }
            }
        )
    })
    return {
        body: await response.json(),
        status: response.status,
        headers: response.statusText
    }
}

module.exports = {
    getRovrLogs,
    getRovrRunReport,
    getRovrTelemetryReport,
    getObservrLogs,
    getObservrRunReport,
    getObservrTelemetryReport
}