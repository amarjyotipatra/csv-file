const fs = require('fs')
const csv = require('csv-parser')

exports.parseCsv = (filePath) => {
  return new Promise((resolve, reject) => {
    const records = []
    fs.createReadStream(filePath)
        .pipe(csv.parse({ columns: true, trim: true }))
        .on('data', (row) => records.push(row))
        .on('end', () => resolve(records))
        .on('error', (error) => reject(error))
    });
}