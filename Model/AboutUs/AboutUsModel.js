const mongoose = require("mongoose");

const AboutUsSchema = new mongoose.Schema({
  Image:{
    type: String,
    required: true,
  },
  Heading: {
    type: String,
    required: true,
  },
  Text: {
    type: String,
    required: true,
  },


}
)

module.exports = mongoose.model("About_Us", AboutUsSchema);


