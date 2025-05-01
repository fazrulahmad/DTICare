const express = require('express');
const router = express.Router();
const { generateSurveiSurat } = require('../controllers/suratController');

router.post('/', generateSurveiSurat);

module.exports = router;
