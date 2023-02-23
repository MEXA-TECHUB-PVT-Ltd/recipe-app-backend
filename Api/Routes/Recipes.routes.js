const express= require('express')
const app= express()
const  middleware  = require('../Middleware/FileUpload.middleware')
const upload = middleware.upload
const RecipeController = require('../../Controller/RecipesController/Recipes.controller')
app.post('/CreateRecipe',upload.fields([{ name: 'RecipeImage', maxCount: 3 }, { name: 'RecipeVideo', maxCount: 3 }]),RecipeController.CreateRecipe)
app.post('/UpdateRecipe',upload.fields([{ name: 'RecipeImage', maxCount: 3 }, { name: 'RecipeVideo', maxCount: 3 }]),RecipeController.UpdateRecipe)
app.post('/DeleteRecipe',RecipeController.DeleteRecipe)
app.get('/ViewAllRecipe',RecipeController.ViewAllRecipe)
app.post('/ViewAllRecipeBySavedStatus',RecipeController.ViewAllRecipeBySavedStatus)

app.post('/ViewRecipe',RecipeController.ViewRecipe)
app.post('/searchRecipieByCategory',RecipeController.SearchRecipeByCategory)
app.post('/SearchRecipeByName',RecipeController.SearchRecipeByName)
app.post('/searchRecipieByRecipieType',RecipeController.SearchRecipeByRecipieType)
app.post('/searchRecipieByCountry',RecipeController.SearchRecipeByCountry)
app.post('/searchRecipieByRecipieTypeLatest',RecipeController.SearchRecipeByRecipieTypeLatest)

module.exports= app