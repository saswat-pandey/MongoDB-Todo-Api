const {ObjectID}=require('mongodb')
const{Todos}=require('./../../models/Todo.js')

const todos=[
  {
    _id:new ObjectID(),
    text:"Something to do 2"

  },
  {
    _id:new ObjectID(),
    text:"Something to do 3"

  }
];

var populateTodos=(done)=>{
  Todos.remove({}).then(()=>{
    return Todos.insertMany(todos);
  }).then(()=>done()).catch((err)=>{
    console.log(`An error has occured ${err}`);
  });
};

module.exports={
  todos,
  populateTodos
};
