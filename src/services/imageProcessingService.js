const prisma = require('../config/database')
const axios = require('axios')
const sharp = require('sharp')
const {promisify} = require('util')
const fs = require('fs')

const webhookService = require('./webhookService')
const exp = require('constants')

const pipeline = promisify(sharp.pipeline)

exports.processImages = async (requestId, records) => {
try {
    await prisma.processingRequest.update({
        where: { requestId },
        data: { status: 'processing' },
    });

    const outputUrls= []
    for (const record of records) {
        const inputUrl= record.inputImageUrls.split(',').map(url => url.trim());
        const processedUrls= []
       
        for (const url of inputUrl) {
            const response= await axios.get(url, {responseType: 'arraybuffer'})
            const buffer= Buffer.from(response.data);
            // Compress image by 50% quality
        const compressedBuffer = await sharp(buffer)
        .jpeg({ quality: 50 })
        .toBuffer();

        // Save to public folder
        const filename = `output-${Date.now()}.jpg`;
        await pipeline(
            Buffer.from(compressedBuffer),
            fs.createWriteStream(`public/${filename}`)
        );

        processedUrls.push(`http://localhost:3000/public/${filename}`);
        }

        outputUrls.push(processedUrls.join(','));
    }

    // Update database with output URLs and status
    await prisma.processingRequest.update({
        where: { requestId },
        data: {
          outputImageUrls: outputUrls.join(','),
          status: 'completed',
        },
      });

    // Notify webhook
    await webhookService.triggerWebhook(requestId, 'completed');
} catch (error) {
    await prisma.processingRequest.update({
        where: { requestId },
        data: { status: 'failed' },
    });
    console.error("Image processing failed, ",error);
}
}