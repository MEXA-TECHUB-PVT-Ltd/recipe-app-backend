const mongoose = require("mongoose");

const UserPrefSchema=new mongoose.Schema({
    name:{
        type: String,
        enum: ['veg', 'non veg','both'],
        required:true
    },
}
)

// UserPrefSchema.method("toJSON", function() {
//     const { __v, _id, ...object } = this.toObject();
//     object.id = _id;
//     return object;
//   });

// const User_Pref_schema = mongoose.model("UserPref", UserPrefSchema);
// module.exports={ User_Pref_schema}
module.exports = mongoose.model("UserPref", UserPrefSchema);


