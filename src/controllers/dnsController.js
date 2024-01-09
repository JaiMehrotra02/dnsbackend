const axios = require('axios');
const config = require('../config');
const DNSRecord = require('../models/DNSRecord');
const { DNS } = require('@google-cloud/dns');

const gcpApiUrl = 'https://dns.googleapis.com';
const dns = new DNS({
  keyFilename: 'client_secret_11886845437-rs1di7up54tfk52srg5g2fsvrmj5afo7.apps.googleusercontent.com.json',
});

exports.getAllRecords = async (req, res) => {
  try {
    const records = await DNSRecord.find();
    res.json(records);
  } catch (error) {
    console.error('Error fetching DNS records:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// router.get('/dns-records', async (req, res) => {
//   try {
//     const zoneName = 'example-zone'; 
//     const zone = dnsClient.zone(zoneName);

//     // Fetch DNS records
//     const [records] = await zone.getRecords();

//     res.json(records);
//   } catch (error) {
//     console.error('Error fetching DNS records:', error);
//     res.status(500).json({ error: 'Failed to fetch DNS records' });
//   }
// });

exports.addRecord = async (req, res) => {
  const { a, aaaa, cname, mx, ns, ptr, soa, srv, txt, dnssec } = req.body;

  try {
    
    // Save the record to your local MongoDB
    const newRecord = new DNSRecord({ a, aaaa, cname, mx, ns, ptr, soa, srv, txt, dnssec });
    await newRecord.save();

    res.json(newRecord);
  } catch (error) {
    console.error('Error adding DNS record:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// GET a specific DNS record by ID
exports.getRecordById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const record = await DNSRecord.findById(id);
      if (!record) {
        return res.status(404).json({ error: 'DNS Record not found' });
      }
      res.json(record);
    } catch (error) {
      console.error('Error fetching DNS record:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // update a DNS record by ID
  exports.updateRecord = async (req, res) => {
    const { id } = req.params;
    const { a, aaaa, cname, mx, ns, ptr, soa, srv, txt, dnssec } = req.body;
  
    try {
      const updatedRecord = await DNSRecord.findByIdAndUpdate(
        id,
        { a, aaaa, cname, mx, ns, ptr, soa, srv, txt, dnssec },
        { new: true }
      );
      if (!updatedRecord) {
        return res.status(404).json({ error: 'DNS Record not found' });
      }
      res.json(updatedRecord);
    } catch (error) {
      console.error('Error updating DNS record:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // DELETE a DNS record by ID
  exports.deleteRecord = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedRecord = await DNSRecord.findByIdAndDelete(id);
      if (!deletedRecord) {
        return res.status(404).json({ error: 'DNS Record not found' });
      }
      res.json({ message: 'DNS Record deleted successfully' });
    } catch (error) {
      console.error('Error deleting DNS record:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  