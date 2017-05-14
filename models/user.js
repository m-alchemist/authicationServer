const mongoose=require('mongoose');
const bcrypt=require('bcrypt-nodejs')

const Schema=mongoose.Schema;;



//define our model
const userSchema=new Schema ({
  email: {type: String, unique: true, lowercase: true},
  password: String


})

//on save Hook, encrypr password

userSchema.pre('save',function(next){
//get access to user model
  const user=this;
  //gen salt then run callback
  bcrypt.genSalt(10, function(err,salt){
    if(err)  {return next(err);}
    //hash or encrypt password using salt
    bcrypt.hash(user.password,salt, null, function(err,hash){
      if(err){  return next(err);}
      //overwrite plain text pass with encrypte pass
      user.password=hash;
      next();
    })
  })
})
//comapring passwords using bcrypt
userSchema.methods.comparePassword=function(candidatePassword,callback){
  bcrypt.compare(candidatePassword,this.password,function(err,isMatch){
    if(err){return callback(err)}
    callback(null,isMatch);

  })
}
//create the model class

const ModelClass=mongoose.model('user',userSchema);

module.exports=ModelClass;
