const Joi = require("joi");

const createAddress={
    body:Joi.object().keys({
        address:Joi.string().required(),
        defaultAddress:Joi.boolean(),
        status:Joi.boolean()
    })
}


const updateAddress={
    params: Joi.object().keys({
        id: Joi.number().required()
      }),
    body:Joi.object().keys({
        address:Joi.string().required(),
        defaultAddress:Joi.boolean(),
        status:Joi.boolean()
    })
}

module.exports={createAddress,updateAddress}