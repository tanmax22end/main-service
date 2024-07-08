const mongoose = require('mongoose');

const { v4: uuidv4 } = require('uuid');
const {imageProcessSchema} = require("../../../util/validators");
const { Schema } = mongoose;

const requestInfoModel = new Schema({
    _id: {
        type: String,
        default: uuidv4,
    },
    status: {
        type: String,
        required: true
    }
}, {collection: 'request-info-model', timestamps: true});

module.exports = mongoose.model('request-info-model',requestInfoModel);
