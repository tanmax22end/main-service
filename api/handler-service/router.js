const express = require('express');
const multer = require('multer');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/image-process', upload.single('file'), (req,res,next)=> {
    req.container.resolve('imageProcessApi').handleRequest(req, res).catch(next);
});

router.get('/status/:id', (req,res,next) => {
    req.container.resolve('requestStatusApi').handleRequest(req,res).catch(next);
})

router.post('/webhook/confirmation', (req,res,next) => {
    req.container.resolve('confirmationWebhook').handleRequest(req,res).catch(next);
})

module.exports = router;
