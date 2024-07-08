const { Readable } = require('stream');
const csv = require('csv-parser');

const _ = require('lodash');

class ImageProcess {
    constructor(utility, imageProcessLogic, validationSchemas) {
        this.utility = utility;
        this.imageProcessLogic = imageProcessLogic;
        this.imageProcessSchema = validationSchemas.imageProcessSchema.HandlerSchema
    }

    async handleRequest (req, res) {
        try {
            if(!req.file) {
                return this.utility.writeResponse({code: 400, msg: 'No file uploaded!'}, null, res);
            }
            const buffer = req.file.buffer;
            const readableFileStream = new Readable();
            readableFileStream.push(buffer);
            readableFileStream.push(null);

            const results = [];
            await readableFileStream
                .pipe(csv())
                .on('data', (data) => {
                    const extractedData = {
                        productName: _.get(data, 'Product Name'),
                        inputImage: _.get(data,'Input Image Urls').split(',')
                    }
                    results.push(extractedData);
                })
            let {error, value} = this.imageProcessSchema.validate(results);
            if(error) {
                return this.utility.writeResponse({code: 400, msg: 'Invalid File Format'}, null,res);
            }

            let [err, response] = await this.utility.invoker(this.imageProcessLogic.processImage(value));
            return this.utility.writeResponse(null,{
                msg: 'Successfully processed the image',
                data: response
            }, res);
        } catch(err) {
            return this.utility.writeResponse({ code: 500, msg: 'Failed to add ban entry!' }, null, res);
        }
    }
}

module.exports = ImageProcess;
