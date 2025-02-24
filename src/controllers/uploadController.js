const prisma = require('../config/database')
const csv = require('csv-parser')
const fs = require('fs')
const {v4: uuidv4} = require('uuid')

const imageProcessingService = require('../services/imageProcessingService')

exports.uploadCsv = async (req, res) => {
 try {
    const requestId= uuidv4()
    const file=req.file
    if (!file) {
        return res.status(400).json({ error: 'No CSV file uploaded' });
      }
    const records = [];
    fs.createReadStream(file.path)
    .pipe(csv.parse({ columns: true, trim : true }))
    .on('data', (row)=>{
        records.push({
            serialNumber: row['S. No.'],
            productName: row['Product Name'],
            inputImageUrls: row['Input Image Urls'],
          });
    })
    .on('end', async ()=>{
       // Validate CSV format
       if (!records.every(record => 
        record.serialNumber && record.productName && record.inputImageUrls)) {
        return res.status(400).json({ error: 'Invalid CSV format' });
      }

      // Store request in database
      await prisma.processingRequest.create({
        data: {
          requestId,
          productName: records[0].productName,
          inputImageUrls: records[0].inputImageUrls,
          status: 'pending',
        },
      });

      // Process images asynchronously
      imageProcessingService.processImages(requestId, records);

      res.json({ requestId });
    })
    .on('error', (error) => {
        res.status(500).json({ error: 'Error parsing CSV' });
      });
 } catch (error) {
    res.status(500).json({ error: error.message });
 }   
}