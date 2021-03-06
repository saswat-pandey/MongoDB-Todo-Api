require('./config/config')

const {mongoose}=require('./db/mongoose');
const express= require('express');
const bodyParser=require('body-parser')
const {ObjectId}=require('mongodb');
const _=require("lodash")

var {Todos}=require('./models/Todo.js');
var {Users}=require('./models/Users.js');
var {authenticate}=require('./middleware/authenticate.js')



var app=express();

const port=process.env.PORT;
app.use(bodyParser.json());

app.post('/todos',(request,response)=>{
  var todo=new Todos({
    text:request.body.text
  })
  todo.save().then((docs)=>{
    console.log(docs);
    response.send(docs);
  },(err)=>{
    console.log(`An Error has occured:${err}`);
  });
});


app.post('/users',(req,res)=>{
  var body=_.pick(req.body,['email','password']);

  var user=new Users({
    email:body.email,
    password:body.password
  });

  user.save().then(()=>{
    return user.generateAuthToken();
  }).then((token)=>{
    res.header('x-auth',token).send(user._id);
  }).catch((e)=>{
    res.status(404).send(e);
  });
});


app.post('/users/login',(req,res)=>{
  var body=_.pick(req.body,["email","password"]);
  var user=new Users({
    email:body.email,
    password:body.password
  });
  Users.findByCredentials(user.email,user.password).then((user)=>{
  return user.generateAuthToken().then((token)=>{
    console.log(`akgdskjfdsalkjhfdsalkjhfdskjhfsdakhfdsakljfhsadlkjfhdsalkjfhdslkfasjhlfksdjah:::::::::${token}`);
    res.header('x-auth',token).send(user)
  });
  }).catch((e)=>{
    res.status(400).send(e);
  });
});

app.get('/users',(req,res)=>{
  Users.find().then((user)=>{
    res.send({
      user:user
    });
  },(err)=>{
    res.status(400).send(err);
  })
});


app.get('/users/me',authenticate,(req,res)=>{
  res.send(req.user);
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
