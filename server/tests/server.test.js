const expect=require('expect');
const request=require('supertest');
const {ObjectID}=require('mongodb')

const {app}= require('./../server.js')
const{Todos}=require('./../models/Todo.js')

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

describe('GET/todo : id',()=>{
  it("should return the todo doc",(done)=>{
    request(app)
    .get(`/todos/${todos[0]._id.toHexString()}`)
    .expect(200)
    .expect((res)=>{
      expect(res.body.todo.text).toBe(todos[0].text)
    })
    .end(done);
  });

  it("should return  404 if the todo user is not found",(done)=>{
    var randId= new ObjectID();
    request(app)
    .get(`/todos/${randId.toHexString()}`)
    .expect(404)
    .end(done);
  });

  it("should return 404 for the non-object Id",(done)=>{
    request(app)
    .get(`/todos/123`)
    .expect(400)
    .end(done);
  });

});

describe("Delete /todos/:id",()=>{

  it("should delete a document",(done)=>{
    request(app)
    .delete(`/todos/${todos[0]._id.toHexString()}`)
    .expect(200)
    .expect((res)=>{
      expect(res.body.doc.text).toBe(todos[0].text);
    })
    .end(done);
  });

  it("should return 404 if the objectId is not there",(done)=>{
    const objId=new ObjectID();
    request(app)
    .delete(`/todos/${objId.toHexString()}`)
    .expect(404)
    .end(done);
  });

  it("should return 404 if the objectId is not valid",(done)=>{

    request(app)
    .delete(`/todos/123`)
    .expect(404)
    .end(done);
  });
});

  describe("Update /todos/:id",()=>{

    it("should update a document",(done)=>{
      request(app)
      .patch(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res)=>{
        expect(res.body.doc.text).toBe(todos[0].text);
      })
      .end(done);
    });

    it("should return 404 if the objectId is not there",(done)=>{
      const objId=new ObjectID();
      request(app)
      .patch(`/todos/${objId.toHexString()}`)
      .expect(404)
      .end(done);
    });

    it("should return 404 if the objectId is not valid",(done)=>{
      request(app)
      .patch(`/todos/123`)
      .expect(404)
      .end(done);
    });
  });
