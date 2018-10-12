const mongoose= require('mongoose');

var Todos=mongoose.model('Todos',{
  text:{
    type:String,
    required:true,
    minlength:1,
    trim:true ///reoves leading and trailing spaces
  },
  completed:{
    type:Boolean,
    default:null
  },
  completedAt:{
    type:Number,
    default:null
  }
});

module.exports={
  Todos
}
