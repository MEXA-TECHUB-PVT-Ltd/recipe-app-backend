const mongoose = require("mongoose");

const SavedRecipesSchema=new mongoose.Schema({
       Recipe_ID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipes'
   },
       UserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
   }

}
)

module.exports = mongoose.model("SavedRecipes", SavedRecipesSchema);


