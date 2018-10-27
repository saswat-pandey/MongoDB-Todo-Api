const mongoose=require('mongoose');
const validator=require('validator');
const jwt=require('jsonwebtoken');
const _=require('lodash');


var userSchema = new mongoose.Schema({
  email:{
    type:String,
    required:true,
    minlength:1,
    trim:true,
    unique:true,
    validate:{
      // validator:(value)=>{
      //   validator.isEmail(value);
      // }
      validator:validator.isEmail,
      message:'{VALUE} is not a valid email'
    }
  },
  password:{
    type:String,
    required:true,
    minlength:6
  },
  tokens:[{
    access:{
      type:String,
      required:true
    },
    token:{
      type:String,
      required:true
    }
  }]
});

userSchema.methods.toJSON= function (){
  var user=this;
  return _.pick(user.toObject(),['email','password']);

};
userSchema.methods.generateAuthToken = function () {
  var user=this;
  var access= 'Auth';
  var token=jwt.sign({id:user._id.toHexString(),access},'todo123').toString();

  user.tokens=user.tokens.concat([{access,token}]);
  user.save().then(()=>{
    return token;
  })
};

var Users=mongoose.model('Users',userSchema);



module.exports={
  Users
}
