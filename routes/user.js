const express = require("express")
const Router = express.Router()
const register = require("../controller/usercontroller")
const session = require("../middleware/session")

Router.get("/login",session.islogin,register.loginpage)
Router.get("/home",session.sessionCheck,register.homepage)
Router.get('/logout',session.sessionCheck,register.logoutpage)
Router.post("/signup",register.createuser)
Router.post("/signin",register.login)



module.exports = Router;