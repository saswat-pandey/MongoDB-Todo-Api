var mongoose=require('mongoose');

mongoose.Promise=global.Promise;
mongoose.connect(process.env.MONGODB_URI,{newUrlParser:true});

module.exports={
  mongoose
}
