const _ = require('lodash');
const mongoose = require('mongoose');


class RequestInfoRepo {
    constructor(requestInfoModel) {
        this.requestInfoModel = requestInfoModel;
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
        return this.requestInfoModel.create(document).then(obj => this._transformObj(obj));
    }

    async get(id, projections = null) {
        if (projections) {
            return await this.requestInfoModel.findById(id, projections).then(obj => this._transformObj(obj));
        }
        return await this.requestInfoModel.findById(id, null, ).then(obj => this._transformObj(obj));
    }

    async update(id, updateObj, returnNew = true, session ) {
        return this.requestInfoModel.findOneAndUpdate({
            _id: id,
        }, updateObj, { new: returnNew, session }).then(obj => this._transformObj(obj));
    }
}

module.exports = RequestInfoRepo;
