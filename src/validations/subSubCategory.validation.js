const Joi = require("joi");

const createSubSubCategory={
    body:Joi.object().keys({
        subCategoryId:Joi.number().required(),
        subSubCategoryName:Joi.string().required(),
        image:Joi.string().optional(),
        status:Joi.boolean()
    })
}


const updateSubSubCategory={
    params: Joi.object().keys({
        id: Joi.number().required()
      }),
    body:Joi.object().keys({
        // subCategoryId:Joi.number().required(),
        subSubCategoryName:Joi.string().required(),
        image:Joi.string().optional(),
        status:Joi.boolean()
    })
}

module.exports={createSubSubCategory,updateSubSubCategory}