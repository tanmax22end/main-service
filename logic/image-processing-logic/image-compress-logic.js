const _ = require('lodash');
const fs = require('fs');
const sharp = require('sharp');
const axios = require("axios")

class ImageCompressLogic {
    constructor(imageProcessRepo, handlerService) {
        this.imageProcessRepo = imageProcessRepo;
        this.handlerService = handlerService;
    }

    async compressImage(reqBody){
       await Promise.all( _.map(reqBody.imageList, async (element) => {
            const outputPath = `./static/image_${Date.now()}.jpeg`;
            const imageBuffer = await this.bufferImageFromUrl(element.inputImage);
            const compressedImageBuffer = await sharp(imageBuffer).jpeg({ quality: 50 }).toBuffer();
            fs.writeFileSync(outputPath, compressedImageBuffer);

            const updateBody = {
                $push: {
                    outputImage: outputPath
                }
            }
            const response = await this.imageProcessRepo.update(element.productId, updateBody);
            console.log('response',response);
        }));
        this.handlerService.webhookCall({status: 'finished', requestId: reqBody.requestId})
        return null;
    }

    async bufferImageFromUrl(url){
        try{
            const res = await axios({
                url,
                responseType: "arraybuffer",
            });
            const buffer = Buffer.from(res.data, "utf-8")
            return buffer;
        }
        catch(err){
            return new Error("Error in downloading Image");
        }
    }
}

module.exports = ImageCompressLogic;
