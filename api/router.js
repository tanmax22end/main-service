const express = require('express');
const handlerService = require('./handler-service/router');
const imageProcessingService = require('./image-processing-service/router')

const router = express.Router();

router.use('/handler-service', handlerService)

router.use('/image-processing-service', imageProcessingService)

module.exports = router;
