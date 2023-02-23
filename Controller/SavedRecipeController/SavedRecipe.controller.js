const RecipeSchema = require('../../Model/RecipesModel/Recipes.model')
const Recipe =  require('../../Model/SavedRecipeModel/SavedRecipe.model')
const ResponseCode = require('../../Utils/Responses/ResponseCode')
const mongoose = require('mongoose');

const SaveRecipe = async(req,res)=>{
  
  const RecipeData = new Recipe({
    _id: mongoose.Types.ObjectId(),
    Recipe_ID: req.body.Recipe_ID,
    UserId: req.body.UserId,

  });
  console.log(RecipeData._id)
    const updateData = {
    $push: {
        savedBy: req.body.UserId,
    }
}
const options = {
    new: true
}
RecipeSchema.findByIdAndUpdate(req.body.Recipe_ID, updateData, options, (error, result) => {
    if (error) {
        res.json(error.message)
    } else {
      RecipeData.save((error, result) => {
        if (error) {
          res.send(error)
        } else {
          res.json({ data: result, message: "Created Successfully" })
         
        }
      })
        // res.send({data:result,message:"Updated Successfully"})
    }
})
}

const DeleteSaveRecipe=(req,res)=>{
  const UserId=req.body.UserId;
        const RecipieId=req.body.Recipe_ID;
  Recipe.find({ Recipe_ID: req.body.Recipe_ID,UserId:req.body.UserId }, function (err, foundResult) {
    try {
      // res.json(foundResult)
      for(let i=0;i<foundResult.length;i++){
             Recipe.findByIdAndDelete(foundResult[i]._id, (error, result) => {
          if (error) {
              res.send({message:error.message})
          } else {
          }
      })
      }
      const updateData = {
              $pull: {
                  savedBy: UserId,
              }
          }
          const options = {
              new: true
          }
          RecipeSchema.findByIdAndUpdate(RecipieId, updateData, options, (error, result) => {
              if (error) {
                  res.json(error.message)
              } else {
                res.json({data:result,message:'Updated Successfully'})
              }
            })
    } catch (err) {
        res.json(err)
    }
})
 
}


const ViewAllSavedRecipe = async (req,res)=>{
    const Data =  await Recipe.find();
    console.log(Data)
    res.status(200).send(
      {
          Data,
          message:"Recipe data found successfully"
      }
       ) 
}

const ViewAllSavedRecipeByUserId = async (req,res)=>{
  const UserId=req.body.UserId
  Recipe.find({ UserId: UserId }, function (err, foundResult) {
    try {
        res.json({data:foundResult})
    } catch (err) {
        res.json(err)
    }
})

}

module.exports={
  SaveRecipe,
  ViewAllSavedRecipe,
  DeleteSaveRecipe ,
  ViewAllSavedRecipeByUserId} 