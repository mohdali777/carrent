const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    
        username: {
            type: String,
            required: true,
            unique: true,  
            trim: true,    
          },
          email: {
            type: String,
            required: true,
            unique: true,  
            lowercase: true, 
            trim: true,   
          },
          password: {
            type: String,
            required: true,
            minlength: 6,  // Minimum length for password
          }
    })
module.exports = mongoose.model('user',userSchema)
