//const MongoClient=require('mongodb').MongoClient

//Object destructuring

const {MongoClient,ObjectId}=require('mongodb');

MongoClient.connect("mongodb://localhost:27017/TodoApp", { useNewUrlParser: true },(err,client)=>{
  if(err){
     return console.log("Unable to connect to the mongodb server");
  }
  const db= client.db();

db.collection('Todos').findOneAndUpdate({
  _id:new ObjectId('5bbd1ba70178f4223697576d')
},{
  $set:{
    completed:true
  }
}).then((result)=>{
  console.log(result);
},(err)=>{
  console.log("Error Updating the Documents",err);
});

db.collection('Users').findOneAndUpdate({
  _id:new ObjectId('5bbd1a3dd143dd02449df425')
},{
  $set:{
    name:'Saurya'
  },
  $inc:{
    age:-7
  }
}).then((result)=>{
  console.log(result);
},
(error)=>{
  console.log(`Error updating:::::::::::::${error}`);
})
});
