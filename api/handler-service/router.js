const express = require('express');

const router = express.Router();

router.post('/image-process', (req,res,next)=> {
    req.container.resolve('imageProcessApi').handleRequest(req, res).catch(next);
});
