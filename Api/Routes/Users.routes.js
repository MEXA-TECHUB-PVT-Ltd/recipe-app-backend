const express= require('express')
const app= express()

const UserController = require('../../Controller/UsersController/Users.controller')
app.post('/CreateUser',UserController.createUser)
app.post('/LoginUser',UserController.UserSignIn)
app.post('/UserChangeOTPPass',UserController.User_ChangePassword)
 app.post('/UserResetPass',UserController.User_ResetPassword)
app.post('/ChangeWithConfirmPass',UserController.ChangeWithConfirmPass)
app.post('/ViewUser',UserController.ViewUser)
app.get('/ViewAllUsers',UserController.ViewAllUsers)
app.post('/UpdateUser',UserController.UpdateUser)
app.post('/DeleteUser',UserController.DeleteUserAccount)
module.exports= app