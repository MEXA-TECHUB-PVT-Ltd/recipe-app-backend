const mongoose = require("mongoose");

const CategoriesSchema=new mongoose.Schema({

    
       Category_name:{
        type:String,
        required:true,
       },

      //   Recipe_Country:{
      //   type:String,
      //   required:true,
      //  },

      //   Recipe_type:{
      //   type:String,
      //   required:true,
      //  },


}
)


module.exports = mongoose.model("Categories", CategoriesSchema);

