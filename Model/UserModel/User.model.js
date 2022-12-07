const mongoose = require("mongoose");

const UserSchema=new mongoose.Schema({

    UserName:{
        type:String,
        required:true,
       },
   
    UserPass:{
        type:String,
        required:true,
       },

    UserEmail:{
        type:String,
        required:true,
       },

    User_Preferences:{
        type:String,
        required:true,
       },

    User_genere:{
        type:String,
        required:true,
       },


}
)

UserSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

const User_schema = mongoose.model("Users", UserSchema);
module.exports={ User_schema}

