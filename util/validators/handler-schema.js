const Joi  = require('joi');
const _ = require('lodash');

const ItemsSchema = Joi.object({
    productName: Joi.string().required(),
    inputImage: Joi.array().items()
})

const HandlerSchema = Joi.array().items(ItemsSchema);

const CompressImageSchema = Joi.array().items(
    Joi.object({
        inputImage: Joi.string().required(),
        requestId: Joi.string().required(),
        productId: Joi.string().required()
    })
)

module.exports = {
    HandlerSchema: HandlerSchema,
    CompressImageSchema: CompressImageSchema
}
