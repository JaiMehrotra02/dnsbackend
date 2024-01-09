const mongoose = require('mongoose');

const dnsRecordSchema = new mongoose.Schema({
  a: String,
  aaaa: String,
  cname: String,
  mx: String,
  ns: String,
  ptr: String,
    soa: String,
    srv: String,
    txt: String,
    dnssec: String,  
  
  // Add other relevant fields
});

const DNSRecord = mongoose.model('DNSRecord', dnsRecordSchema);

module.exports = DNSRecord;
