const Joi = require("joi");

const createCategory={
    body:Joi.object().keys({
        categoryName:Joi.string().required(),
        popularCategory:Joi.boolean().required(),
        status:Joi.boolean()
    })
}


const updateCategory={
    params: Joi.object().keys({
        id: Joi.number().required()
      }),
    body:Joi.object().keys({
        categoryName:Joi.string().required(),
        popularCategory:Joi.boolean().required(),

        status:Joi.boolean()
    })
}

module.exports={createCategory,updateCategory}