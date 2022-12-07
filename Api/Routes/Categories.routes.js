const express= require('express')
const app= express()

const CategoriesController = require('../../Controller/CategoriesController/Categories.controller')
app.post('/CreateCategory',CategoriesController.CreateCategory)
app.post('/UpdateCategory',CategoriesController.UpdateCategory)
app.post('/DeleteCategory',CategoriesController.DeleteCategory)
app.get('/ViewAllCategories',CategoriesController.ViewAllCategories)
app.post('/ViewCategory',CategoriesController.ViewCategory)
module.exports= app