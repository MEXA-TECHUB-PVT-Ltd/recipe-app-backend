const express= require('express')
const app= express()

const CategoriesController = require('../../Controller/AboutUsController/AboutUs.controller')
app.post('/CreateAboutUs',CategoriesController.CreateAboutUs)
app.post('/UpdateAboutUs',CategoriesController.UpdateAboutUs)
app.post('/DeleteAboutUs',CategoriesController.DeleteAboutUs)
app.get('/ViewAllAboutUs',CategoriesController.ViewAllAbout)
app.post('/ViewAboutUs',CategoriesController.ViewAboutUs)
module.exports= app