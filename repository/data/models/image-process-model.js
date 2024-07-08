const mongoose = require('mongoose');

const { v4: uuidv4 } = require('uuid');
const { Schema } = mongoose;

const imageProcessModel = new Schema({
    _id: {
        type: String,
        default: uuidv4,
    },
    productName: {
        type: String,
        required: true
    },
    inputImage: {
        type: Array
    },
    outputImage: {
        type: Array
    },
    requestId: {
        type: String
    }
},{ collection: 'image-process-model', timestamps: true })

module.exports = mongoose.model('image-process-model',imageProcessModel);
