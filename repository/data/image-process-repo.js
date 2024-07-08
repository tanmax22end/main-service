const _ = require('lodash');
const mongoose = require('mongoose');

class ImageProcessRepo {
    constructor(imageProcessModel) {
        this.imageProcessModel = imageProcessModel;
    }

    _transformObj(obj) {
        if (!obj) {
            return {};
        }

        if (typeof obj.toObject === 'function') {
            return obj.toObject();
        }

        return obj;
    }

    async insert(document) {
        return this.imageProcessModel.create(document).then(obj => this._transformObj(obj));
    }

    async get(id, projections = null) {
        if (projections) {
            return await this.imageProcessModel.findById(id, projections).then(obj => this._transformObj(obj));
        }
        return await this.imageProcessModel.findById(id, null, ).then(obj => this._transformObj(obj));
    }

    async update(id, updateObj, returnNew = true ) {
        return this.imageProcessModel.findOneAndUpdate({
            _id: id,
        }, updateObj, { new: returnNew }).then(obj => this._transformObj(obj));
    }

}

module.exports = ImageProcessRepo;
