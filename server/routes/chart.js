const express = require('express');
const router = express.Router();
const { getPersonalChart } = require('../controllers/chartController');

router.get('/personal/:spotifyId/:timeRange', getPersonalChart);

module.exports = router;