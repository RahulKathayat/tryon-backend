const Joi = require("joi");

const createCategory={
    body:Joi.object().keys({
        description:Joi.string().required(),
        status:Joi.boolean()
    })
}


const updateCategory={
    params: Joi.object().keys({
        id: Joi.number().required()
      }),
    body:Joi.object().keys({
        description:Joi.string().required(),
        status:Joi.boolean()
    })
}

module.exports={createCategory,updateCategory}