const adminModel = require("../model/admin")
const bcrypt = require("bcrypt")
const usermodel = require("../model/usermodel")


const login = (req,res)=>{
    const admin = req.session.user 
    if(!admin) return res.redirect("/login")
      if(req.session.admin) return res.redirect("dash")  
    res.render('admin')
}


const dashpage = async (req,res)=>{
    const admin = req.session.admin;
    if(!admin) return res.redirect("/admin/login")
    const user = await usermodel.find({})
    res.render('dash',{user})
}

const logout = (req,res)=>{
req.session.admin = false;

res.redirect('/home')
}


const postlogin = async (req,res)=>{
    try{
 const {email,password} = req.body;
 
 const admin = await adminModel.findOne({email})

    if(!admin) return res.render('admin',{message:"gafsd"})

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.render('admin', { message: 'Password does not match' });
        }

        req.session.admin = true

        res.redirect('/admin/dash')

    }catch(err){
        res.status(500).send(`${err} error found`)
    }
}



const adduser = async(req,res)=>{
    try{
  const {username,email,password} = req.body
  const user = await usermodel.findOne({email})
  if(user){
    res.render("dash",{message:"user alredy exist"})
  }
  const saltRounds = 10;  // Number of salt rounds (higher is more secure but slower)
  const hashedPassword = await bcrypt.hash(password, saltRounds);
 const newuser = new usermodel({
   username,email,password:hashedPassword
 });
 await newuser.save()
 req.session.user = true
 res.redirect("/admin/dash")
    }catch(err){
        console.log(err)
        res.status(500).send("Error creating user: " + err.message);
        // res.render('signup')
    }
}

const deleteuser = async (req,res)=>{
    const userId = req.params.userId;
    try {
        await usermodel.findByIdAndDelete(userId); 
        res.status(200).send('User deleted');
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to delete user');
    }
 }

const edituser = async (req,res)=>{
try{
const {email,password} = req.body;
const saltRounds = 10;  // Number of salt rounds (higher is more secure but slower)
  const hashedPassword = await bcrypt.hash(password, saltRounds);
const user = await usermodel.updateOne({email},{$set:{password:hashedPassword}})
res.redirect("/admin/dash");
}catch(err){
    res.send("error")
    console.log(err);
    
}

}




module.exports = {login,dashpage,postlogin,logout,adduser,edituser,deleteuser}