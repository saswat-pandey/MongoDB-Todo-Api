//const MongoClient=require('mongodb').MongoClient

//Object destructuring

const {MongoClient,ObjectId}=require('mongodb');

MongoClient.connect("mongodb://localhost:27017/TodoApp", { useNewUrlParser: true },(err,client)=>{
  if(err){
     return console.log("Unable to connect to the mongodb server");
  }
  const db= client.db();

db.collection('Todos').find({
  _id:new ObjectId('5bbb920c481ce915047e7eed')
}).toArray().then((docs)=>{
  console.log("Successfully Fetch the data");
  console.log(JSON.stringify(docs,undefined,2));
},(error)=>{
  console.log("Unsuccessful to fetch the data");
});

db.collection('Todos').find().count().then((count)=>{
  console.log("Todos:::::::::::::::::::::::::::::::::::::::::::::::::");
  console.log("The number of documents in the Users collection",count);
},(err)=>{
  console.log(`An error has occured :::::::${err}`);
});
});
