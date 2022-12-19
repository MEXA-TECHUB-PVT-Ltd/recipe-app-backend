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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserPref'
    },

    User_genere:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserGenere'
    },
    location:String,
    isLogin:Boolean

}
)

module.exports = mongoose.model("Users", UserSchema);


