//const MongoClient=require('mongodb').MongoClient

//Object destructuring

const {MongoClient,ObjectId}=require('mongodb');

MongoClient.connect("mongodb://localhost:27017/TodoApp", { useNewUrlParser: true },(err,client)=>{
  if(err){
     return console.log("Unable to connect to the mongodb server");
  }
  const db= client.db();

db.collection('Todos').deleteMany({
  text:"To do Something"
}).then((result)=>{
  console.log(result);
},(err)=>{
  console.log("Deletion Unsuccessful");
});

db.collection("Todos").findOneAndDelete({
  _id:new ObjectId('5bbb92288e95ff0a182212d3')
}).then((result)=>{
  console.log(result);
},(err)=>{
  console.log("Deletion Unsuccessful");
});
});
