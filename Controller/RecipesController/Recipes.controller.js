const RecipeSchema = require('../../Model/RecipesModel/Recipes.model')
const Recipe = RecipeSchema.Recipe_schema
const ResponseCode = require('../../Utils/Responses/ResponseCode')

const CreateRecipe = (req,res)=>{
      
    const {
        Category_ID,
        Recipe_name,
        Recipe_Time,
        IngredientList,
        Making_Procedure,
        noOfPersons,
        Recipe_Image,
        Recipe_Video
      } = req.body
    
        if (!req.body.Recipe_name) {
            res.status(400).send({ message: "Content can not be empty!" });
            return;
          }

      
      //  let RecipeImages= []
      //  let RecipeVideo = []
      //  let i=0,j=0

      //  while (req.files['RecipeImage'][i]) {
      //   RecipeImages.push(req.files['RecipeImage'][i].path)
      //   i++;
      // }
     
      // while (req.files['RecipeVideo'][j]) {
      //   RecipeVideo.push(req.files['RecipeVideo'][j].path)
      //   j++;
      // }


      // console.log(RecipeImages,RecipeVideo)
    

    const recipe= new Recipe({
        Category_ID,
        Recipe_name,
        Recipe_Time,
        IngredientList,
        Making_Procedure,
        noOfPersons:Number(noOfPersons),
        Recipe_Image,
        Recipe_Video

    })

    // save User into database

recipe.save(recipe)
  .then(data => {
     let id= data.id
   console.log("data of recipe before adding Ingredients ",data)
    Recipe.findByIdAndUpdate(
        id,
        {$set : {
           Recipe_Ingredients:   IngredientList,
           Recipe_Image:Recipe_Image,
           Recipe_Video:Recipe_Video
         }}
    ).then(data=>{
        console.log("data of srecipe after adding Ingredients ",data)
      res.status(200).send({
      data,
      message:"recipe created Successfully",
      resCode: ResponseCode.ACCOUNT_CREATED_SUCCESSFULLY
    });

    }).catch(err=>{
        res.status(500).send({
            message:
              err.message || "Some error occurred while creating Recipe Ingredients"
          });
    })



  
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Recipe.",
        resCode: ResponseCode.ERROR_MESSAGE
    });
  });
   
}


const DeleteRecipe =(req,res)=>{
    const {id} = req.body;
    console.log(id)
     
    if (!req.body.id) {
        res.status(400).send({ message: "Recipe Id required to delete data" });
        return;
      }


    Recipe.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Recipe with id=${id}. Maybe Recipe was not found!`
          });
        } else {
          res.send({
            message: "Recipe deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Recipe with id=" + id
        });
      });
}


const UpdateRecipe = (req,res)=>{
    const {
        id,
        Recipe_name,
        Recipe_Time,
        IngredientList,
        Recipe_Image,
        Recipe_Video,
        Making_Procedure}  = req.body

        if(!req.body){
            res.status(400).send({ message: "No Data Found To Update" });
            return;
        }

      //   let RecipeImages= []
      //   let RecipeVideo = []
      //   let i=0,j=0
 
      //   while (req.files['RecipeImage'][i]) {
      //    RecipeImages.push(req.files['RecipeImage'][i].path)
      //    i++;
      //  }
      
      //  while (req.files['RecipeVideo'][j]) {
      //    RecipeVideo.push(req.files['RecipeVideo'][j].path)
      //    j++;
      //  }
 
 
      //  console.log(RecipeImages,RecipeVideo)
     
 

        Recipe.findByIdAndUpdate(id, {
            Recipe_name,
            
            Recipe_Time,
            Making_Procedure,
            $set : {  
               Recipe_Ingredients :  IngredientList,
               Recipe_Image:Recipe_Image,
               Recipe_Video:Recipe_Video,
             }
        }).then(data=>{
      res.status(200).send({
        message:" Recipe updated successfully",

      });
           
    }).catch(err=>{
        res.status(500).send({
            message:
              err.message || "Some error occurred while updating Recipe"
          });
    })
}


const ViewAllRecipe =async (req,res)=>{
   
    const Data =  await Recipe.find();
  console.log(Data)
  res.status(200).send(
    {
        Data,
        message:"Recipe data found successfully"
    }
     ) 
}


const ViewRecipe =async (req,res)=>{
    const {id} = req.body
    console.log(id)
    const Data = await Recipe.findById(id)
    console.log(Data)
    if(Data){
    res.status(200).send({
      Data,
      message:"Recipe Found Successfully"
    });
  }else{
    res.status(500).send({
      message:"Error Finding Recipe"
    });
  }
}




module.exports = {
    CreateRecipe,
    DeleteRecipe,
    UpdateRecipe,
    ViewAllRecipe,
    ViewRecipe
}