const express= require('express')
const app= express()

const CategoriesController = require('../../Controller/UserGenereController/UserGenerecontroller')
app.post('/CreateUserGenere',CategoriesController.createUserGenere)
app.post('/UpdateUserGenere',CategoriesController.updateUserGenere)
app.delete('/DeleteUserGenere/:UserGenereId',CategoriesController.deleteUserGenere)
app.get('/ViewAllUserGenererences',CategoriesController.getAllUserGenere)
app.get('/ViewUserGenere/:UserGenereId',CategoriesController.getUserGenere)

module.exports= app