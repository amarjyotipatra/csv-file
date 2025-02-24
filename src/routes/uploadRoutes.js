const express = require('express');
const multer = require('multer');
const router = express.Router();
const uploadController = require('../controllers/uploadController');

const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('csvFile'), uploadController.uploadFile);

module.exports = router;