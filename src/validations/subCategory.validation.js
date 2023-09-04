const Joi = require("joi");

const createSubCategory={
    body:Joi.object().keys({
        categoryId:Joi.number().required(),
        description:Joi.string().required(),
        status:Joi.boolean()
    })
}


const updateSubCategory={
    params: Joi.object().keys({
        id: Joi.number().required()
      }),
    body:Joi.object().keys({
        categoryId:Joi.number().required(),
        description:Joi.string().required(),
        status:Joi.boolean()
    })
}

module.exports={createSubCategory,updateSubCategory}