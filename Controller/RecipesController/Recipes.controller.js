const mongoose = require("mongoose");
const RecipeSchema = require('../../Model/RecipesModel/Recipes.model')
const Recipe = require('../../Model/RecipesModel/Recipes.model')
const ResponseCode = require('../../Utils/Responses/ResponseCode')
const Ingredients = require('../../Model/IngredientsModel/Ingredients.model')

const CreateRecipe = (req, res) => {
  const RecipeData = new Recipe({
    _id: mongoose.Types.ObjectId(),
    Category_ID: req.body.Category_ID,
    Recipe_name: req.body.Recipe_name,
    Recipe_Image: req.body.Recipe_Image,
    Recipe_Video: req.body.Recipe_Video,
    Recipe_Time: req.body.Recipe_Time,
    Recipe_Ingredients: [],
    savedBy:[],
    Making_Procedure: req.body.Making_Procedure,
    noOfPersons: req.body.noOfPersons,
    country_of_recipie: req.body.country_of_recipie,
    recipie_type: req.body.recipie_type

  });
  RecipeData.save((error, result) => {
    if (error) {
      res.send(error)
    } else {
      res.json({ data: result, message: "Created Successfully" })
    }
  })
}
const SearchRecipeByCategory = (req, res) => {
  const Category_ID = req.body.Category_ID
  Recipe.find({ Category_ID: Category_ID }, (error, result) => {
    if (error) {
      res.send(error)
    } else {
      res.send(result)
    }
  }).populate('recipie_type').populate('Category_ID')
}
const SearchRecipeByRecipieType = (req, res) => {
  const recipie_type = req.body.recipie_type
  Recipe.find({ recipie_type: recipie_type }, (error, result) => {
    if (error) {
      res.send(error)
    } else {
      res.send(result)
    }
  }).populate('recipie_type').populate('Category_ID')
}
const SearchRecipeByCountry = (req, res) => {
  const country_of_recipie = req.body.country_of_recipie
  Recipe.find({
    "country_of_recipie": { $regex: country_of_recipie, $options: 'i' }
  }, (error, result) => {
    if (error) {
      res.send(error)
    } else {
      res.send(result)
    }
  }).populate('recipie_type').populate('Category_ID')
}
const SearchRecipeByName = (req, res) => {
  const Recipe_name = req.body.Recipe_name
  Recipe.find({
    "Recipe_name": { $regex: Recipe_name, $options: 'i' }
  },
    function (err, result) {
      if (err) { return handleError(err); } else {
        res.json(result);

      }

    })
}


const DeleteRecipe = (req, res) => {
  const { id } = req.body;
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


const UpdateRecipe = (req, res) => {
  const {
    id,
    Category_ID,
    Recipe_name,
    Recipe_Image,
    Recipe_Video,
    Recipe_Time,
    noOfPersons,
    country_of_recipie,
    recipie_type,
    Making_Procedure } = req.body

  if (!req.body) {
    res.status(400).send({ message: "No Data Found To Update" });
    return;
  }

  Recipe.findByIdAndUpdate(id, {
    Category_ID,
    Recipe_name,
    noOfPersons,
    Recipe_Time,
    Making_Procedure,
    country_of_recipie,
    Recipe_Image,
    Recipe_Video,
    recipie_type
  }).then(data => {
    res.status(200).send({
      message: " Recipe updated successfully",

    });

  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while updating Recipe"
    });
  })
}


const ViewAllRecipe = async (req, res) => {
  Recipe.find({}, (error, result) => {
    if (error) {
      res.send(error)
    } else {
      res.send(result)
    }
  }).populate('recipie_type').populate('Category_ID')


}


const ViewRecipe = async (req, res) => {
  const { id } = req.body
  Ingredients.find({ recipie_id: id }, function (err, foundResult) {
    try {
      let ArrayData = [];
      ArrayData = foundResult;
      Recipe.find({ _id: id }, (error, result) => {
        if (error) {
          res.send(error)
        } else {
          let ArrayRecipie = result;
          console.log(ArrayRecipie[0].Recipe_Ingredients)
          ArrayRecipie[0].Recipe_Ingredients = ArrayData;
          res.json(ArrayRecipie)
        }
      }).populate('recipie_type').populate('Category_ID')

    } catch (err) {
      res.json(err)
    }
  })

}




module.exports = {
  CreateRecipe,
  DeleteRecipe,
  UpdateRecipe,
  ViewAllRecipe,
  ViewRecipe,
  SearchRecipeByCategory,
  SearchRecipeByName,
  SearchRecipeByRecipieType,
  SearchRecipeByCountry
}