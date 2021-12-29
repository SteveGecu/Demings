const Consumer = require('../Client/GatewayConsumer')

async function getGenericDetectionReportReady(dsn) {
    const Messages = await Consumer.getConfluentKafkacatMessage('cv.generic-detection-report-ready', 10)
    const sortedMessage = Messages.sort((a, b) => {
        return new Date(a.meta.originEventTimestamp).valueOf() - new Date(b.meta.originEventTimestamp).valueOf()
    })
    const dsnMessage = sortedMessage.reverse().find(m => m.data.dsn == dsn)
    return dsnMessage
}

async function getGenericDetectionReportGenerated(dsn) {
    const Messages = await Consumer.getConfluentKafkacatMessage('cv.product-report-generated', 10)
    const sortedMessage = Messages.sort((a, b) => {
        return new Date(a.meta.originEventTimestamp).valueOf() - new Date(b.meta.originEventTimestamp).valueOf()
    })
    const dsnMessage = sortedMessage.reverse().find(m => m.data.dsn == dsn)
    return dsnMessage
}

async function getDetectionsByImage(dsn) {
    const Messages = await Consumer.getConfluentKafkacatMessage('cv.detections-by-image-id', 10)
    // const sortedMessage = Messages.sort((a, b) => {
    //     return new Date(a.meta.originEventTimestamp).valueOf() - new Date(b.meta.originEventTimestamp).valueOf()
    // })
    const dsnMessage = Messages.reverse().find(m => m.dsn == dsn)
    return dsnMessage
}

module.exports = {
    getGenericDetectionReportReady,
    getGenericDetectionReportGenerated,
    getDetectionsByImage
}