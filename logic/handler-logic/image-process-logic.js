const _ = require('lodash');

class ImageProcessLogic {
    constructor(requestInfoRepo, imageProcessRepo, imageProcessingService) {
        this.requestInfoRepo = requestInfoRepo;
        this.imageProcessRepo = imageProcessRepo;
        this.imageProcessingService = imageProcessingService
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
                    productId: element._id
                }
            })]
        })
        this.imageProcessingService.imageCompress({imageList: imageList, requestId: requestInfo._id}).catch((err) => {
            return {
                error: err
            }
        }) ;
        return productList;
    }
}

module.exports = ImageProcessLogic;
