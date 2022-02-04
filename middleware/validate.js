const Joi = require('joi')


const updateSchema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().optional(),
    gender: Joi.string().optional(),
    dob: Joi.string().optional(),
    bloodgrp: Joi.string().optional()
})


module.exports={updateSchema}
