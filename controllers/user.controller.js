const User = require('../models/user.model');
const httpErros = require('http-errors');

const joiUser = require("../helper/joi/user.joi_validation");

const createAppUser = async (req, res, next) => {
    try {
        const userDetails = await joiUser.createUserSchema.validateAsync(req.body);
        const newUser = new User({
            name: userDetails.name,
            email: userDetails.email,
            phoneNumber: userDetails.phoneNumber,
            date: userDetails.date,
            time: userDetails.time,
        })
        await newUser.save();

        if (res.headersSent === false) {
            res.status(200).send({
                error: false,
                data: {
                    message: "User created successfully",
                },
            });
        }

    } catch (error) {
        console.log(error);
        next(error);
    }
}

const getAppUser = async (req, res, next) => {
    try {
        console.log(req.body);
        const userSchema = await joiUser.getUserSchema.validateAsync(req.body);

        const query = {};

        if (userSchema.userId) {
            query.where.id = userSchema.userId
        }

        const users = await User.findAll(query);

        await Promise.all(
            users.map(user => {
                delete user.createdAt;
                delete user.updatedAt;
            })
        )

        if (res.headersSent === false) {
            res.status(200).send({
                error: false,
                data: {
                    users: users,
                    message: "User fetched successfully",
                },
            });
        }

    } catch (error) {
        console.log(error);
        next(error);
    }
}

const updateAppUser = async (req, res, next) => {
    try {
        const userDetails = await joiUser.updateUserSchema.validateAsync(req.body);

        console.log(userDetails);

        const user = await User.findOne({
            where: {
                id: userDetails.userId,
            }
        })

        if (!user) {
            throw httpErros.NotFound(`User with id: ${userDetails.userId} not exist.`);
        }

        const updatedUser = await User.update(
            {
                id: userDetails.userId,
                name: userDetails.name,
                email: userDetails.email,
                phoneNumber: userDetails.phoneNumber,
                date: userDetails.date,
                time: userDetails.time,
            },
            {
                where: {
                    id: userDetails.userId
                }
            })


        if (res.headersSent === false) {
            res.status(200).send({
                error: false,
                data: {
                    message: "User updated successfully",
                },
            });
        }



    } catch (error) {
        console.log(error);
        next(error);
    }
}

const deleteAppUser = async (req, res, next) => {
    try {
        console.log("body", req.body)
        const userDetails = await joiUser.deleteUserSchema.validateAsync(req.body);

        const user = await User.findOne({
            where: {
                id: userDetails.userId,
            }
        })

        if (!user) {
            throw httpErros.NotFound(`User with id: ${userDetails.userId} not exist.`);
        }

        const updatedUser = await User.destroy(
            {
                where: {
                    id: userDetails.userId
                }
            }
        );

        if (res.headersSent === false) {
            res.status(200).send({
                error: false,
                data: {
                    message: "User deleted successfully",
                },
            });
        }

    } catch (error) {
        console.log(error);
        next(error);
    }
}


module.exports = {
    createAppUser,
    getAppUser,
    updateAppUser,
    deleteAppUser
}