const express= require('express')
const app= express()

const CategoriesController = require('../../Controller/UserPrefController/UserPref.controller')
app.post('/CreateUserPref',CategoriesController.createUserPref)
app.post('/UpdateUserPref',CategoriesController.updateUserPref)
app.delete('/DeleteUserPref/:UserPrefId',CategoriesController.deleteUserPref)
app.get('/ViewAllUserPrefrences',CategoriesController.getAllUserPref)
app.get('/ViewUserPref/:UserPrefId',CategoriesController.getUserPref)

module.exports= app