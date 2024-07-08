
class ImageCompressApi {
    constructor(utility, validationSchemas, imageCompressLogic) {
        this.utility = utility;
        this.imageCompressSchema = validationSchemas.imageProcessSchema.CompressImageSchema;
        this.imageCompressLogic = imageCompressLogic;
    }

    async handleRequest(req, res) {
        try{
            let {err, value} = this.imageCompressSchema.validate(req.body);
            if(err) {
                return this.utility.writeResponse({code: 400, msg: 'Payload Validation failed'}, null, res);
            }
            let [error, response] = await this.utility.invoker(this.imageCompressLogic.compressImage(value));
            return this.utility.writeResponse(null,{
                msg: 'Successfully compressed the image',
                data: response
            }, res);
        } catch(error) {
            return this.utility.writeResponse({ code: 500, msg: 'Failed to compress the image!' }, null, res);
        }
    }

}

module.exports = ImageCompressApi;
