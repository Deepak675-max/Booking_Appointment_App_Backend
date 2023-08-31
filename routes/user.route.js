const express = require("express");

const userRouter = express.Router();

const userController = require("../controllers/user.controller");

userRouter.post("/user/create-user", userController.createAppUser);

userRouter.post("/user/get-user", userController.getAppUser);

userRouter.patch("/user/update-user", userController.updateAppUser);

userRouter.put("/user/delete-user", userController.deleteAppUser);

module.exports = userRouter;
