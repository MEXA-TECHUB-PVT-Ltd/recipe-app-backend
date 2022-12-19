const mongoose = require("mongoose");

const RecipesSchema = new mongoose.Schema({

  Category_ID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categories'
  },


  Recipe_name: {
    type: String,
    required: true,
  },

  Recipe_Image: [{
    type: String,
    default: [],
  }],

  Recipe_Video: [{
    type: String,
    default: [],
  }],


  Recipe_Time: {
    type: String,
    required: true,
  },

  Recipe_Ingredients: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ingredients'
  }],


  Making_Procedure: {
    type: String,
    required: true,
  },

  noOfPersons: {
    type: Number,
    required: true,
  },
  country_of_recipie: String,
  recipie_type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserPref'
  },
  savedBy:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SavedRecipes'
  }]




}, {

  timestamps: true
}
)

module.exports = mongoose.model("Recipes", RecipesSchema);


