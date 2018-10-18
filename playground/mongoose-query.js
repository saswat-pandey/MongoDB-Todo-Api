const {
  ObjectId
} = require('mongodb');

const {
  mongoose
} = require('./../server/db/mongoose.js');
const {
  Users
} = require('./../server/models/Users');

const id = '5bbfcdbd92ef2216e8159247';

if (!ObjectId.isValid()) {
  console.log(`User Id not valid`);
};
Users.find({
  _id: id //Mongoose directly converts it to the oject
}).then((users) => {
  console.log(`:::::::::::::::::::Find::::::::::::::::::::::::::::;`);
  console.log(`The users are:${users}`);
}).catch((err) => {
  console.log(`Error has occured:${err}`);
});


Users.findOne({
  _id: id //Mongoose directly converts it to the oject
}).then((users) => {
  console.log(`:::::::::::::::::::FindOne::::::::::::::::::::::::::::;`);
  console.log(`The users are:${users}`);
}).catch((err) => {
  console.log(`Error has occured:${err}`);
});


Users.findById(id).then((users) => {
  console.log(`:::::::::::::::::::FindById::::::::::::::::::::::::::::;`);

  if (!users) {
    return console.log(`No such users avaiable`);
  }
  console.log(`The users are:${users}`);
}).catch((err) => console.log(`Error has occured:${err}`));