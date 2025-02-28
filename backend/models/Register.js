const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const RegisterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmpassword: {
        type: String,
        required: true
    },
    tokens:[
        {
            token:String
        }
    ]
});

RegisterSchema.pre('save' , async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password , 12)
        this.confirmpassword = await bcrypt.hash(this.confirmpassword , 12)
    }
    next();
})

RegisterSchema.methods.generateAuthToken = async function(){
    try {
        let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token: token});
        await this.save();
        return token;
    }catch(err){
        console.log(err);
    }
}

const RegisterModel = mongoose.model('customerRegister' , RegisterSchema);
module.exports = RegisterModel;