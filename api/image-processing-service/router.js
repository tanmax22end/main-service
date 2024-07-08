const express = require('express');

const router = express.Router();

router.post('/image-compress', (req,res,next)=> {
    req.container.resolve('imageCompressApi').handleRequest(req,res).catch(next);
})

module.exports = router;
