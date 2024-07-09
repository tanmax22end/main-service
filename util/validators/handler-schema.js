const Joi  = require('joi');
const _ = require('lodash');

const ItemsSchema = Joi.object({
    productName: Joi.string().required(),
    inputImage: Joi.array().items()
})

const HandlerSchema = Joi.array().items(ItemsSchema);

const CompressImageSchema = Joi.object({
    requestId: Joi.string().required(),
    imageList: Joi.array().items(
        Joi.object({
            inputImage: Joi.string().required(),
            productId: Joi.string().required()
        })
    )
})

module.exports = {
    HandlerSchema: HandlerSchema,
    CompressImageSchema: CompressImageSchema
}
