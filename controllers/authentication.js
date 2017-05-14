const User=require('../models/user');
const jwt=require('jwt-simple');
const config=require('../config')

function tokenForUser(user){
  const timestamp=new Date().getTime();
  return jwt.encode({sub: user.id, iat:timestamp},config.secret);
}
exports.signin=function(req,res,next){


    res.send({token: tokenForUser(req.user)} )

}
exports.signup=function(req,res,next){
  const email=req.body.email;
  const password=req.body.password

  //case missing pass or user
  if(!email)
    return res.status(422).send({err:'Email Missing'});

  if(!password)
    return res.status(422).send({err:'password Missing'})
  //see if the user exists
  User.findOne({email:email},function(err,existingUser){

    //no connection to db
    if(err)
      return next(err) ;

    //if exists return an Error
    if(existingUser)
    return res.status(422).send({err:'Email Exists'})


      //if a user does not exist create and save user record
      const user=new User({
        email: email,
        password:password
      })

      user.save(function(err){
        if(err)
        return next(err)

        res.json({token:tokenForUser(user)});
      });

  })







  //respond to request with user created
}
