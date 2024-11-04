const express = require('express')
const Router = express()
const adminController = require("../controller/admincontroller")
const session = require("../middleware/session")
Router.get('/login',adminController.login)


Router.get('/dash',adminController.dashpage)


Router.post('/admin-login',adminController.postlogin)

Router.get("/logout",adminController.logout)


Router.post("/add-user",adminController.adduser)

Router.post("/edit-user",adminController.edituser)

Router.post("/delete-user/:userId",adminController.deleteuser)




module.exports = Router;