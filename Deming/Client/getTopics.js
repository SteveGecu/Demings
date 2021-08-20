const Consumer = require('../Client/GatewayConsumer')

async function getRovrLogMessage(dsn) {
    const messages = await Consumer.getKafkacatMessage('rovr.log', 50)
    const dsnMessage = messages.reverse().find(m => m.data.dsn == dsn)
    return dsnMessage
}
async function getObservrLogMessage(dsn) {
    const messages = await Consumer.getKafkacatMessage('observr.log', 10)
    const dsnMessage = messages.reverse().find(m => m.data.dsn == dsn)
    return dsnMessage
}

async function getRovrTelemetryReportMessage(dsn) {
    const messages = await Consumer.getKafkacatMessage('rovr.report.telemetry', 10)
    const dsnMessage = messages.reverse().find(m => m.data.provisioning.dsn == dsn)
    return dsnMessage
}

async function getObservrTelemetryReportMessage(dsn) {
    const messages = await Consumer.getKafkacatMessage('observr.report.telemetry', 10)
    const dsnMessage = messages.reverse().find(m => m.data.provisioning.dsn == dsn)
    return dsnMessage
}

async function getRovrRunReportMessage(dsn) {
    const messages = await Consumer.getKafkacatMessage('rovr.report.run', 10)
    const dsnMessage = messages.reverse().find(m => m.data.provisioning.dsn == dsn)
    return dsnMessage
}

////////////////////////////////////////////////////////////////

async function getRovrUploadReportMessage(dsn) {
    const messages = await Consumer.getKafkacatMessage('deming.minio.media.uploaded.rovr', 10)
    const dsnMessage = messages.reverse().find(m => m.Key.slice(20, 32) == dsn)
    return dsnMessage
}

async function getObservrUploadReportMessage(dsn) {
    const messages = await Consumer.getKafkacatMessage('deming.minio.media.uploaded.observr', 10)
    const dsnMessage = messages.reverse().find(m => m.Key.slice(20, 32) == dsn)
    return dsnMessage
}

async function getMediaReadyMessage(dsn) {
    const messages = await Consumer.getKafkacatMessage('deming.notification.media.ready.rovr', 10)
    const dsnMessage = messages.reverse().find(m => m.data.dsn == dsn)
    return dsnMessage
}

async function getObservrMediaReadyMessage(dsn) {
    const messages = await Consumer.getKafkacatMessage('deming.notification.media.ready.observr', 10)
    const dsnMessage = messages.reverse().find(m => m.data.dsn == dsn)
    return dsnMessage
}

async function getDetectionReadyMessage(dsn) {
    const messages = await Consumer.getKafkacatMessage('deming.object.detection.ready.rovr', 10)
    console.log(messages);
    const dsnMessage = messages.reverse().find(m => m.data.dsn == dsn)
    return dsnMessage
}

async function getBarcodeDetectionReadyMessage(dsn) {
    const messages = await Consumer.getKafkacatMessage('deming.barcode.detection.ready.rovr', 10)
    console.log(messages);
    const dsnMessage = messages.reverse().find(m => m.data.dsn == dsn)
    return dsnMessage
}

async function getObservrDetectionReadyMessage(dsn) {
    const messages = await Consumer.getKafkacatMessage('deming.object.detection.ready.observr', 10)
    console.log(messages);
    const dsnMessage = messages.reverse().find(m => m.data.dsn == dsn)
    return dsnMessage
}

async function getObservrBarcodeDetectionReadyMessage(dsn) {
    const messages = await Consumer.getKafkacatMessage('deming.barcode.detection.ready.observr', 10)
    console.log(messages);
    const dsnMessage = messages.reverse().find(m => m.data.dsn == dsn)
    return dsnMessage
}

async function getDetectionCompleteMessage(dsn) {
    const messages = await Consumer.getKafkacatMessage('deming.object.detection.complete.rovr', 1)
    const dsnMessage = messages.reverse().find(m => m.data.dsn == dsn)
    return dsnMessage
}

async function getBarcodeDetectionCompleteMessage(dsn) {
    const messages = await Consumer.getKafkacatMessage('deming.barcode.detection.complete', 1)
    const dsnMessage = messages.reverse().find(m => m.data.dsn == dsn)
    return dsnMessage
}

async function getObservrDetectionCompleteMessage(dsn) {
    const messages = await Consumer.getKafkacatMessage('deming.object.detection.complete.observr', 1)
    const dsnMessage = messages.reverse().find(m => m.data.dsn == dsn)
    return dsnMessage
}

async function getTrackingCompleteMessage(dsn) {
    const messages = await Consumer.getKafkacatMessage('deming.object.detection.tracking.complete', 1)
    const dsnMessage = messages.reverse().find(m => m.data.dsn == dsn)
    return dsnMessage
}


async function getReportCreatedMessage(dsn) {
    const messages = await Consumer.getKafkacatMessage('deming.rovr.rail.product.report.created', 1)
    const dsnMessage = messages.reverse().find(m => m.data.dsn == dsn)
    return dsnMessage
}

async function getBarcodeReportCreatedMessage(dsn) {
    const messages = await Consumer.getKafkacatMessage('deming.rovr.rail.barcode.report.created', 1)
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
    getReportCreatedMessage,
    getObservrLogMessage,
    getObservrTelemetryReportMessage,
    getObservrUploadReportMessage,
    getObservrMediaReadyMessage,
    getObservrDetectionReadyMessage,
    getObservrDetectionCompleteMessage,
    getBarcodeDetectionReadyMessage,
    getObservrBarcodeDetectionReadyMessage,
    getBarcodeDetectionCompleteMessage,
    getBarcodeReportCreatedMessage

}