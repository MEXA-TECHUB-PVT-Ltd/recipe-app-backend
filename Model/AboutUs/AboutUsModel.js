const mongoose = require("mongoose");

const AboutUsSchema = new mongoose.Schema({
  
  Title: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },


}
)

module.exports = mongoose.model("About_Us", AboutUsSchema);


