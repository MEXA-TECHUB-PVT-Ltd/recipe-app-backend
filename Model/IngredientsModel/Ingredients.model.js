const mongoose = require("mongoose");

const IngredientsSchema=new mongoose.Schema({

    Item_Name:{
        type:String,
        required:true,
       },

    Item_quantity:{
        type:String,
        required:true,
       },
       recipie_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Recipes'
       }
    
   }
)



module.exports = mongoose.model("Ingredients", IngredientsSchema);


