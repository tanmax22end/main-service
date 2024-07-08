const _ = require('lodash');

class ImageProcessLogic {
    constructor(requestInfoRepo, imageProcessRepo, imageCompressLogic) {
        this.requestInfoRepo = requestInfoRepo;
        this.imageProcessRepo = imageProcessRepo;
        this.imageCompressLogic = imageCompressLogic
    }

    async processImage(results) {

        const requestInfo = await this.requestInfoRepo.insert({status: 'In Progress'});
        const productList = await Promise.all(_.map(results, async (result) => {
            const productData = {
                productName: result.productName,
                inputImage: result.inputImage,
                requestId: requestInfo._id
            }
            return await this.imageProcessRepo.insert(productData);
        }));

        let imageList = [];
        _.forEach(productList, (element) => {
            imageList = [...imageList, ..._.map(element.inputImage, (image) => {
                return {
                    inputImage: image,
                    requestId: element.requestId,
                    productId: element._id
                }
            })]
        })
        this.imageCompressLogic.compressImage(imageList).catch((err) => {
            console.log('error', err);
            return {
                error: err
            }
        }) ;
        return productList;
    }
}

module.exports = ImageProcessLogic;
