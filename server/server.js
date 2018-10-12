const {mongoose}=require('./db/mongoose');
const express= require('express');
const bodyParser=require('body-parser')

var {Todos}=require('./models/Todo.js');
var {Users}=require('./models/Users.js');


var app=express();

app.use(bodyParser.json());

app.post('/todos',(request,response)=>{
var todo=new Todos({
  text:request.body.text
})
todo.save().then((docs)=>{
  response.send(docs);
},(err)=>{
  console.log(`An Error has occured:${err}`);
});
});

app.listen(3000,()=>{
  console.log('Started on Port 3000');
});

module.exports={
  app
}
