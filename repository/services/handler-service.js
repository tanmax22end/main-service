const axiosDefault = require('axios');
const {Agent} = require("http");
const qs = require('qs');


class HandlerService {
    constructor(config) {
        this.axios = axiosDefault.create({
            timeout: 10000,
            paramsSerializer: {
                encode: qs.parse,
                serialize: qs.stringify
            },
            httpAgent: new Agent({
                keepAlive: true,
                keepAliveMsecs: 3000
            }),
        });
        this.config = config;
    }

    async webhookCall(reqBody) {
        const response = await this.axios({
            method: 'POST',
            url: this.config.services.handlerService.url,
            data: reqBody,
        })
        return response;
    }
}

module.exports = HandlerService;
