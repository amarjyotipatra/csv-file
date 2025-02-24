const csv =  require('csv-parser')
const fs = require('fs')

exports.validateCsv = (req, res, next) => {
    if(!req.file) {
        return res.status(400).json({ error: 'No CSV file uploaded' });
    }

    const records = [];
    fs.createReadStream(req.file.path)
    .pipe(csv.parse({ columns: true, trim: true }))
    .on('data', (row) => records.push(row))
    .on('end', () => {
        if (!records.every(record => record['S. No.'] && record['Product Name'] && record['Input Image Urls'])) {
            return res.status(400).json({ error: 'Invalid CSV format' });
        }
        next();
    })
    .on('error', (error) => {
        res.status(500).json({ error: 'Error parsing CSV' });
    });
}