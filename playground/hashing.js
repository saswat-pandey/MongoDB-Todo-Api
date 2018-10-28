const bcrypt= require ('bcryptjs');


var password='123abc';

var hashVal="$2a$10$Mh0a1pkAz2SGFFz7NOXtXeS9K/bLW304K0GgnpWXzV5UyBVFCbEy2";

bcrypt.genSalt(10,(err,salt)=>{
  bcrypt.hash(password,salt,(err,hash)=>{
    console.log(hash);
  });
});
