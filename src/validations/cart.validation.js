const Joi = require("joi");

const createCart={
    body:Joi.object().keys({
        userId:Joi.number().required(),
        cartDetail:Joi.object().required(),
        totalAmount:Joi.number().required(),
        totalItems:Joi.number().required(),
        totalQuantity:Joi.number().required(),
        discountCode:Joi.string().required(),
        role:Joi.string().valid("Customer").required(),
        status:Joi.boolean()
    })
}


const updateCart={
    params: Joi.object().keys({
        id: Joi.number().required()
      }),
    body:Joi.object().keys({
        // userId:Joi.number().required(),
        cartDetail:Joi.object().required(),
        totalAmount:Joi.number().required(),
        totalItems:Joi.number().required(),
        totalQuantity:Joi.number().required(),
        discountCode:Joi.string().required(),
        status:Joi.boolean()
    })
}

const clearCart={}

module.exports={createCart,updateCart,clearCart}