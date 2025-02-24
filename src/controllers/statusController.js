const prisma = require('../config/database');

exports.getStatus = async (req, res) => {
  try {
    const { requestId } = req.params;
    const request = await prisma.processingRequest.findUnique({
      where: { requestId },
    });

    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    res.json({ requestId, status: request.status, outputImageUrls: request.outputImageUrls });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};