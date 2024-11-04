const userSchema = require("../model/usermodel");
// const { render } = require("../routes/admin");
const bcrypt = require('bcrypt')


const createuser = async(req,res)=>{
    try{
  const {username,email,password} = req.body
  const user = await userSchema.findOne({email})
  if(user){
    res.render("signup",{message:"user alredy exist"})
  }
  const saltRounds = 10;  // Number of salt rounds (higher is more secure but slower)
  const hashedPassword = await bcrypt.hash(password, saltRounds);
 const newuser = new userSchema({
    username,email,password:hashedPassword
 });
 await newuser.save()
 req.session.user = true
 res.redirect("/home")
    }catch(err){
        console.log(err)
        res.status(500).send("Error creating user: " + err.message);
        // res.render('signup')
    }
}


const login = async (req,res)=>{
    try{
        const {username,password} = req.body;
        const user = await userSchema.findOne({username})
        if(!user) return res.render('signup',{message:"user not exist"})


            const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.render('signup', { message: 'Password does not match' });
        }
        req.session.user = true
            res.redirect('/home')
        }catch(err){
            res.status(500).send(`${err} error found`)
        }
    }

 const loginpage = (req,res)=>{
  res.render('signup')
    }
const homepage = (req,res)=>{
    res.render('home')
}
const logoutpage = (req, res) => {
    // Destroy the session
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send("Error logging out.");
        }
        // Redirect to login page after successful logout
        res.redirect('/login');
    });
}


module.exports = {createuser,login,loginpage,homepage,logoutpage}