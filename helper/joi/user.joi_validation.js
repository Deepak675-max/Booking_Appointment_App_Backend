const joi = require('joi');

const createUserSchema = joi.object({
    name: joi.string().trim().required(),
    email: joi.string().trim().required(),
    phoneNumber: joi.string().trim().required(),
    date: joi.date().required(),
    time: joi.string().required(),
})

const getUserSchema = joi.object({
    userId: joi.number().allow(null).default(null)
})


const updateUserSchema = joi.object({
    userId: joi.number().required(),
    name: joi.string().trim().required(),
    email: joi.string().trim().required(),
    phoneNumber: joi.string().trim().required(),
    date: joi.date().required(),
    time: joi.string().required(),
})


const deleteUserSchema = joi.object({
    userId: joi.number().required()
})

module.exports = {
    createUserSchema,
    getUserSchema,
    updateUserSchema,
    deleteUserSchema
}

