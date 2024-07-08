const express = require('express');
const handlerService = require('./handler-service/router');

const router = express.Router();

router.use('/handler-service', handlerService)

module.exports = router;
