const expect=require('expect');
const request=require('supertest');

const {app}= require('./../server.js')
const{Todos}=require('./../models/Todo.js')

const todos=[
  {text:"Something to do 2"},
  {text:"Something to do 3"}
];

beforeEach((done)=>{
  Todos.remove({}).then(()=>{
    return Todos.insertMany(todos);
  }).then(()=>done()).catch((err)=>{
    console.log(`An error has occured ${err}`);
  });
});

describe('Post/Todo',()=>{

  it('should create a new todo',(done)=>{
    var text='Test todo text';
    request(app)
    .post('/todos')
    .send({text})
    .expect(200)
    .expect((res)=>{
    expect(res.body.text).toBe(text);
    })
    .end((err,res)=>{
      if (err) {
        return done(err);
      }else{
        Todos.find({text:'Test todo text'}).then((todos)=>{
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((err)=>done(err));
      }
    })
  });


  it('should not create a invalid Entry',(done)=>{
    request(app)
    .post('/todos')
    .send({})
    .expect(400)
    .end((err,res)=>{
      if(err){
        return done(err);
      }
        Todos.find().then((Todos)=>{
          expect(Todos.length).toBe(0);
          done();
        }).catch((err)=>{
          done(err);
        });

    })
  })
});

describe('GET/todos',()=>{

it("should get all todos",(done)=>{
request(app)
.get('/todos')
.expect(200)
.expect((res)=>{
  expect(res.body.todo.length).toBe(2);
})
.end(done);
});



});
