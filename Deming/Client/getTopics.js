const Consumer = require('../Client/GatewayConsumer')

async function getRovrLogMessage(dsn) {
    const messages = await Consumer.getKafkacatMessage('rovr.log', 10)
    const dsnMessage = messages.reverse().find(m => m.data.dsn == dsn)
    return dsnMessage
}

async function getRovrTelemetryReportMessage(dsn) {
    const messages = await Consumer.getKafkacatMessage('rovr.report.telemetry', 10)
    const dsnMessage = messages.reverse().find(m => m.data.provisioning.dsn == dsn)
    return dsnMessage
}

async function getRovrRunReportMessage(dsn) {
    const messages = await Consumer.getKafkacatMessage('rovr.report.run', 10)
    const dsnMessage = messages.reverse().find(m => m.data.provisioning.dsn == dsn)
    return dsnMessage
}

async function getRovrUploadReportMessage(dsn) {
    const messages = await Consumer.getKafkacatMessage('deming.minio.media.uploaded.rovr', 10)
    const dsnMessage = messages.reverse().find(m => m.Key.slice(20, 32) == dsn)
    return dsnMessage
}

async function getMediaReadyMessage(dsn) {
    const messages = await Consumer.getKafkacatMessage('deming.notification.media.ready.rovr', 10)
    const dsnMessage = messages.reverse().find(m => m.data.dsn == dsn)
    return dsnMessage
}

async function getDetectionReadyMessage(dsn) {
    const messages = await Consumer.getKafkacatMessage('deming.object.detection.ready.rovr', 10)
    console.log(messages);
    const dsnMessage = messages.reverse().find(m => m.data.dsn == dsn)
    return dsnMessage
}

async function getDetectionCompleteMessage(dsn) {
    const messages = await Consumer.getKafkacatMessage('deming.object.detection.complete.rovr', 10)
    const dsnMessage = messages.reverse().find(m => m.data.dsn == dsn)
    return dsnMessage
}

async function getTrackingCompleteMessage(dsn) {
    const messages = await Consumer.getKafkacatMessage('deming.object.detection.tracking.complete', 10)
    const dsnMessage = messages.reverse().find(m => m.data.dsn == dsn)
    return dsnMessage
}


async function getReportCreatedMessage(dsn) {
    const messages = await Consumer.getKafkacatMessage('deming.rovr.rail.product.report.created', 10)
    const dsnMessage = messages.reverse().find(m => m.data.dsn == dsn)
    return dsnMessage
}






module.exports = {
    getRovrLogMessage,
    getRovrTelemetryReportMessage,
    getRovrRunReportMessage,
    getRovrUploadReportMessage,
    getDetectionReadyMessage,
    getMediaReadyMessage,
    getDetectionCompleteMessage,
    getTrackingCompleteMessage,
    getReportCreatedMessage

}