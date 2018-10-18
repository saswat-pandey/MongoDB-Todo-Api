require('./config/config')

const {mongoose}=require('./db/mongoose');
const express= require('express');
const bodyParser=require('body-parser')
const {ObjectId}=require('mongodb');
const _=require("lodash")

var {Todos}=require('./models/Todo.js');
var {Users}=require('./models/Users.js');



var app=express();

const port=process.env.PORT;
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


app.delete('/todos/:id',(req,res)=>{
var id=req.params.id;
if(!ObjectId.isValid(id)){
return  res.status(404).send();
}
Todos.findByIdAndRemove(id).then((doc)=>{
if(!doc){
  return res.status(404).send();
}
  res.status(200).send({doc});
}).catch((e)=>res.status(400).send())
});

app.patch('/todos/:id',(req,res)=>{
  var id=req.params.id;
  if(!ObjectId.isValid(id)){
    return res.status(404).send();
  }

  var body=_.pick(req.body,['text','completed']);

  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt= new Date(),getTime();
  }else{
    body.completed=false;
    body.completedAt=null;
  }
console.log(`body::::::::::::${body}`);
  Todos.findByIdAndUpdate(id,{
    $set:{
      text:body.text,
      completed:body.completed,
      completedAt:body.completedAt
    }}).then((doc)=>{
    if(!doc){
      return res.status(404).send();
    }
    console.log(doc);
    res.status(200).send({doc});
  }).catch((e)=>{
    res.status(400).send();
  });
});

app.listen(port,()=>{
  console.log(`Started up in port:${port}`);
});


module.exports={
  app
}
