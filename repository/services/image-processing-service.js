const axiosDefault = require("axios");
const qs = require("qs");
const {Agent} = require("http");

class ImageProcessingService {
    constructor(config) {
        this.config = config;
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
    }

    async imageCompress(reqBody){
        const response = await this.axios({
            method: 'POST',
            url: this.config.services.imageProcessingService.url,
            data: reqBody,
        })
        return response;
    }
}

module.exports = ImageProcessingService;
