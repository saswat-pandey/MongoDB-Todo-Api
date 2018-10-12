//const MongoClient=require('mongodb').MongoClient

//Object destructuring

const {MongoClient,ObjectId}=require('mongodb');

MongoClient.connect("mongodb://localhost:27017/TodoApp", { useNewUrlParser: true },(err,client)=>{
  if(err){
     return console.log("Unable to connect to the mongodb server");
  }
  console.log("Connected to the MongoDb Server");
// const dbObject=client.db('TodoApp')
//   dbObject.collection('Todos').insertOne({
//     text:"Something to do",
//     completed:false
//   },(err,result)=>{
//     if(err){
//       return console.log("Unable to insert Todo",err);
//     }
//     console.log(JSON.stringify(result.ops,undefined,2));
//   })
//   client.close();

const db=client.db('TodoApp');

db.collection('Users').insertOne({
  name:'Saswat',
  age:25,
  location:'1100 W Corral Avenue'
},(err,result)=>{
  if(err){
    return console.log("Unable to add the data to collection");
  }
  console.log("Data successfully added");
  console.log(JSON.stringify(result.ops,undefined,2));
  //id contains timestamps
  console.log(result.ops[0]._id.getTimestamp());
});
});
