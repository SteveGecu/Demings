const Consumer = require('../Client/GatewayConsumer')

async function getRovrLogMessage(dsn) {
    const messages = await Consumer.getKafkacatMessage('rovr.log', 50)
    const sortedMessage = messages.sort((a, b) => {
        return new Date(a.meta.originEventTimestamp).valueOf() - new Date(b.meta.originEventTimestamp).valueOf()
    })
    const dsnMessage = sortedMessage.reverse().find(m => m.data.dsn == dsn)
    return dsnMessage
}
async function getObservrLogMessage(dsn) {
    const messages = await Consumer.getKafkacatMessage('observr.log', 10)
    const sortedMessage = messages.sort((a, b) => {
        return new Date(a.meta.originEventTimestamp).valueOf() - new Date(b.meta.originEventTimestamp).valueOf()
    })
    const dsnMessage = sortedMessage.reverse().find(m => m.data.dsn == dsn)
    return dsnMessage
}

async function getRovrTelemetryReportMessage(dsn) {
    const messages = await Consumer.getKafkacatMessage('rovr.report.telemetry', 10)
    const sortedMessage = messages.sort((a, b) => {
        return new Date(a.meta.originEventTimestamp).valueOf() - new Date(b.meta.originEventTimestamp).valueOf()
    })
    const dsnMessage = sortedMessage.reverse().find(m => m.data.dsn == dsn)
    return dsnMessage
}

async function getObservrTelemetryReportMessage(dsn) {
    const messages = await Consumer.getKafkacatMessage('observr.report.telemetry', 10)
    const sortedMessage = messages.sort((a, b) => {
        return new Date(a.meta.originEventTimestamp).valueOf() - new Date(b.meta.originEventTimestamp).valueOf()
    })
    const dsnMessage = sortedMessage.reverse().find(m => m.data.dsn == dsn)
    return dsnMessage
}

async function getRovrRunReportMessage(dsn) {
    const messages = await Consumer.getKafkacatMessage('rovr.report.run', 10)
    const sortedMessage = messages.sort((a, b) => {
        return new Date(a.meta.originEventTimestamp).valueOf() - new Date(b.meta.originEventTimestamp).valueOf()
    })
    const dsnMessage = sortedMessage.reverse().find(m => m.data.dsn == dsn)
    return dsnMessage
}

////////////////////////////////////////////////////////////////

// updated
async function getRovrUploadReportMessage(dsn) {
    const messages = await Consumer.getKafkacatMessage('deming.notification.media.ready.rovr', 10)
    const sortedMessage = messages.sort((a, b) => {
        return new Date(a.meta.originEventTimestamp).valueOf() - new Date(b.meta.originEventTimestamp).valueOf()
    })
    const dsnMessage = sortedMessage.reverse().find(m => m.data.dsn == dsn)
    return dsnMessage
}
// updated
async function getObservrUploadReportMessage(dsn) {
    const messages = await Consumer.getKafkacatMessage('deming.notification.media.ready.observr', 10)
    const sortedMessage = messages.sort((a, b) => {
        return new Date(a.meta.originEventTimestamp).valueOf() - new Date(b.meta.originEventTimestamp).valueOf()
    })
    const dsnMessage = sortedMessage.reverse().find(m => m.data.dsn == dsn)
    return dsnMessage
}

// async function getMediaReadyMessage(dsn) {
//     const messages = await Consumer.getKafkacatMessage('deming.notification.media.ready.rovr', 10)
//     const sortedMessage = messages.sort((a, b) => {
//         return new Date(a.meta.originEventTimestamp).valueOf() - new Date(b.meta.originEventTimestamp).valueOf()
//     })
//     const dsnMessage = sortedMessage.reverse().find(m => m.data.dsn == dsn)
//     return dsnMessage
// }

// async function getObservrMediaReadyMessage(dsn) {
//     const messages = await Consumer.getKafkacatMessage('deming.notification.media.ready.observr', 10)
//     const sortedMessage = messages.sort((a, b) => {
//         return new Date(a.meta.originEventTimestamp).valueOf() - new Date(b.meta.originEventTimestamp).valueOf()
//     })
//     const dsnMessage = sortedMessage.reverse().find(m => m.data.dsn == dsn)
//     return dsnMessage
// }

// updated
async function getDetectionReadyMessage(dsn) {
    const messages = await Consumer.getKafkacatMessage('deming.object.detection.ready.rovr', 10)
    const sortedMessage = messages.sort((a, b) => {
        return new Date(a.meta.originEventTimestamp).valueOf() - new Date(b.meta.originEventTimestamp).valueOf()
    })
    const dsnMessage = sortedMessage.reverse().find(m => m.data.dsn == dsn)

    return dsnMessage
}

async function getBarcodeDetectionReadyMessage(dsn) {
    const messages = await Consumer.getKafkacatMessage('deming.barcode.detection.ready.rovr', 10)
    const sortedMessage = messages.sort((a, b) => {
        return new Date(a.meta.originEventTimestamp).valueOf() - new Date(b.meta.originEventTimestamp).valueOf()
    })
    const dsnMessage = sortedMessage.reverse().find(m => m.data.dsn == dsn)
    return dsnMessage
}
// updated
async function getObservrDetectionReadyMessage(dsn) {
    const messages = await Consumer.getKafkacatMessage('deming.object.detection.ready.observr', 10)
    const sortedMessage = messages.sort((a, b) => {
        return new Date(a.meta.originEventTimestamp).valueOf() - new Date(b.meta.originEventTimestamp).valueOf()
    })
    const dsnMessage = sortedMessage.reverse().find(m => m.data.dsn == dsn)
    return dsnMessage
}

async function getObservrBarcodeDetectionReadyMessage(dsn) {
    const messages = await Consumer.getKafkacatMessage('deming.barcode.detection.ready.observr', 10)
    const sortedMessage = messages.sort((a, b) => {
        return new Date(a.meta.originEventTimestamp).valueOf() - new Date(b.meta.originEventTimestamp).valueOf()
    })
    const dsnMessage = sortedMessage.reverse().find(m => m.data.dsn == dsn)
    return dsnMessage
}
// updated
async function getDetectionCompleteMessage(dsn) {
    const messages = await Consumer.getKafkacatMessage('deming.object.detection.complete.rovr', 10)
    const sortedMessage = messages.sort((a, b) => {
        return new Date(a.meta.originEventTimestamp).valueOf() - new Date(b.meta.originEventTimestamp).valueOf()
    })
    const dsnMessage = sortedMessage.reverse().find(m => m.data.dsn == dsn)
    return dsnMessage
}

async function getBarcodeDetectionCompleteMessage(dsn) {
    const messages = await Consumer.getKafkacatMessage('deming.barcode.detection.complete', 10)
    const sortedMessage = messages.sort((a, b) => {
        return new Date(a.meta.originEventTimestamp).valueOf() - new Date(b.meta.originEventTimestamp).valueOf()
    })
    const dsnMessage = sortedMessage.reverse().find(m => m.data.dsn == dsn)
    return dsnMessage
}
// updated
async function getObservrDetectionCompleteMessage(dsn) {
    const messages = await Consumer.getKafkacatMessage('deming.object.detection.complete.observr', 10)
    const sortedMessage = messages.sort((a, b) => {
        return new Date(a.meta.originEventTimestamp).valueOf() - new Date(b.meta.originEventTimestamp).valueOf()
    })
    const dsnMessage = sortedMessage.reverse().find(m => m.data.dsn == dsn)
    return dsnMessage
}

// async function getTrackingCompleteMessage(dsn) {
//     const messages = await Consumer.getKafkacatMessage('deming.object.detection.tracking.complete', 10)
//     const sortedMessage = messages.sort((a, b) => {
//         return new Date(a.meta.originEventTimestamp).valueOf() - new Date(b.meta.originEventTimestamp).valueOf()
//     })
//     const dsnMessage = sortedMessage.reverse().find(m => m.data.dsn == dsn)
//     return dsnMessage
// }

// updated
async function getGenericDetectionCompleteMessage(dsn) {
    const messages = await Consumer.getKafkacatMessage('deming.generic.object.detection.complete.rovr', 10)
    const sortedMessage = messages.sort((a, b) => {
        return new Date(a.meta.originEventTimestamp).valueOf() - new Date(b.meta.originEventTimestamp).valueOf()
    })
    const dsnMessage = sortedMessage.reverse().find(m => m.data.dsn == dsn)
    return dsnMessage
}


// async function getReportCreatedMessage(dsn) {
//     const messages = await Consumer.getKafkacatMessage('deming.rovr.rail.product.report.created', 10)
//     const sortedMessage = messages.sort((a, b) => {
//         return new Date(a.meta.originEventTimestamp).valueOf() - new Date(b.meta.originEventTimestamp).valueOf()
//     })
//     const dsnMessage = sortedMessage.reverse().find(m => m.data.dsn == dsn)
//     return dsnMessage
// }

async function getGenericReportCreatedMessage(dsn) {
    const messages = await Consumer.getKafkacatMessage('cv.product-report-generated', 10)
    const sortedMessage = messages.sort((a, b) => {
        return new Date(a.meta.originEventTimestamp).valueOf() - new Date(b.meta.originEventTimestamp).valueOf()
    })
    const dsnMessage = sortedMessage.reverse().find(m => m.data.dsn == dsn)
    return dsnMessage
}
async function getBarcodeReportCreatedMessage(dsn) {
    const messages = await Consumer.getKafkacatMessage('deming.rovr.rail.barcode.report.created', 10)
    const sortedMessage = messages.sort((a, b) => {
        return new Date(a.meta.originEventTimestamp).valueOf() - new Date(b.meta.originEventTimestamp).valueOf()
    })
    const dsnMessage = sortedMessage.reverse().find(m => m.data.dsn == dsn)
    return dsnMessage
}

async function getCompleteProductReport(railId) {
    const messages = await Consumer.getConfluentKafkacatMessage('deming.rovr.rail.product.report.compliance.complete', 10)
    const dsnMessage = messages.reverse().find(m => m.data[0].RailId == railId)
    return dsnMessage
}

async function getCompleteBarcodeReport(railId) {
    const messages = await Consumer.getConfluentKafkacatMessage('deming.rovr.rail.barcode.report.compliance.complete', 10)
    const dsnMessage = messages.reverse().find(m => m.data[0].RailId == railId)
    return dsnMessage
}

async function getEventStreamMessage(dsn) {
    const messages = await Consumer.getKafkacatMessage('deming.event.stream', 100)
    const sortedMessage = messages.sort((a, b) => {
        return new Date(a.meta.originEventTimestamp).valueOf() - new Date(b.meta.originEventTimestamp).valueOf()
    })
    const dsnMessage = sortedMessage.reverse().find(m => m.data.payload.dsn == dsn)

    return dsnMessage
}

async function getRangersPushCheckInMessage(dsn) {
    const messages = await Consumer.getConfluentKafkacatMessage('pushr.check-in', 10)
    return messages;
}

async function getRangersPushStatusReport(dsn) {
    const messages = await Consumer.getConfluentKafkacatMessage('pushr.status-report', 10)
    const pushStatusReportMessage = messages.reverse().find(m => m.statusReportEvent.message.header.deviceSerialNumber == dsn)
    return pushStatusReportMessage;
}

module.exports = {
    getRovrLogMessage,
    getRovrTelemetryReportMessage,
    getRovrRunReportMessage,
    getRovrUploadReportMessage,
    getDetectionReadyMessage,
    //getMediaReadyMessage,
    getDetectionCompleteMessage,
    //getTrackingCompleteMessage,
    //getReportCreatedMessage,
    getObservrLogMessage,
    getObservrTelemetryReportMessage,
    getObservrUploadReportMessage,
    //getObservrMediaReadyMessage,
    getObservrDetectionReadyMessage,
    getObservrDetectionCompleteMessage,
    getBarcodeDetectionReadyMessage,
    getObservrBarcodeDetectionReadyMessage,
    getBarcodeDetectionCompleteMessage,
    getBarcodeReportCreatedMessage,
    getCompleteProductReport,
    getCompleteBarcodeReport,
    getEventStreamMessage,
    getRangersPushCheckInMessage,
    getRangersPushStatusReport,
    getGenericDetectionCompleteMessage,
    getGenericReportCreatedMessage
}