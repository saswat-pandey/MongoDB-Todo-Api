const mongoose=require('mongoose');

var Users=mongoose.model('Users',{
  name:{
    type:String,
    required:true,
    minlength:1,
    trim:true
  },
  email:{
    type:String,
    required:true,
    minlength:1,
    trim:true
  },
  age:{
    type:Number
  },
  location:{
    type:String,
    default:'1100 W Corral Avenue'
  }
});

module.exports={
  Users
}
