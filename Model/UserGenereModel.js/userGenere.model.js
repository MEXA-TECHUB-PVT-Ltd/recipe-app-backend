const mongoose = require("mongoose");

const UserGenereSchema=new mongoose.Schema({
    name:{
        type: String,
        enum: ['healthy', 'low carb','gluten free','vegan'],
        required:true
    },
}
)

module.exports = mongoose.model("UserGenere", UserGenereSchema);


