const {mongoose}=require('./db/mongoose');
const express= require('express');
const bodyParser=require('body-parser')
const {ObjectId}=require('mongodb');

var {Todos}=require('./models/Todo.js');
var {Users}=require('./models/Users.js');

const port=process.env.PORT || 3000;

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

app.get('/todos',(req,res)=>{
  Todos.find().then((todo)=>{
    res.send({
      todo:todo
    });
  },(err)=>{
    res.status(400).send(err);
  })
});


app.get('/users/:id',(req,res)=>{
  const id=req.params.id;
  if(!ObjectId.isValid(id)){
    res.status(400).send();
  }
  Users.findById(id)
  .then((user)=>{
    if(!user){
      return  res.status(404).send();
    }
    res.status(200).send(user)
  }).catch((err)=>res.status(400).send());
});


app.get('/todos/:id',(req,res)=>{
  const id=req.params.id;
  if(!ObjectId.isValid(id)){
    res.status(400).send();
  }
  Todos.findById(id)
  .then((todo)=>{
    if(!todo){
      return  res.status(404).send();
    }
    res.status(200).send({todo});
  }).catch((err)=>res.status(400).send());
});

app.listen(port,()=>{
  console.log(`Started up in port:${port}`);
});



module.exports={
  app
}
