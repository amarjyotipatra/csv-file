const axios = require('axios')
require('dotenv').config()

exports.triggerWebhook = async (requestId, status) => {
    try {
        await axios.post(process.env.WEBHOOK_URL, {
            requestId,
            status,
          });
    } catch (error) {
        console.error('Failed to trigger webhook', error)
    }
    }