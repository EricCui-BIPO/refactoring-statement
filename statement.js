const Invoice = require('./Invoice')
const createCalculator = require('./createCalculator')
const formatUSD = require('./format')

function getDetails(invoice, plays) {
    let detail = '';
    for (let perf of invoice.performances) {
        const play = plays[perf.playID];
        let thisAmount = createCalculator(play.type).getAmount(perf);
        // print line for this order
        detail += `  ${play.name}: ${formatUSD(thisAmount)} (${perf.audience} seats)\n`;
    }
    return detail;
}

function statement(invoice, plays) {
    let invoiceInstance = new Invoice(invoice);
    let result = `Statement for ${invoiceInstance.customer}\n`;
    result += getDetails(invoiceInstance, plays);
    result += `Amount owed is ${formatUSD(invoiceInstance.getTotalAmount(invoiceInstance, plays))}\n`;
    result += `You earned ${(invoiceInstance.getTotalVolumeCredits(invoiceInstance, plays))} credits\n`;
    return result;
}

module.exports = statement;
