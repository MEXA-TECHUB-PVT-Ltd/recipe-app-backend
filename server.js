const express = require('express')
const app = express()
const { PORT,MONGODB} = require('./config');
const bodyParser=require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const cors = require("cors");
app.use(cors());


var mongoose = require('mongoose')
app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  app.use('/video-uploads', express.static('video-uploads'))
  app.use('/image-uploads', express.static('image-uploads'))
  app.use('/upload-image', require('./upload-image'))
  const UserRoute = require('./Api/Routes/Users.routes')
  app.use('/upload-multiple-images', require('./upload-multiple-images'))        // upload limit of 5 images
  app.use('/upload-video', require('./upload-video'))

  app.use('/UserApi',UserRoute)

  const AdminRoute = require('./Api/Routes/Admin.routes')
  app.use('/AdminApi',AdminRoute)

  const User_PrefRoute = require('./Api/Routes/User_Pref.routes')
  app.use('/User_Pref',User_PrefRoute)

  const User_GenereRoute = require('./Api/Routes/User_Genere.routes')
  app.use('/User_Genere',User_GenereRoute)
 
  const RecipeRoute = require('./Api/Routes/Recipes.routes')
  app.use('/RecipeApi',RecipeRoute)
 


  const SavedRecipeRoute = require('./Api/Routes/SavedRecipe.routes')
  app.use('/SavedRecipeApi',SavedRecipeRoute)
 
  const AboutUsRoute = require('./Api/Routes/AboutUs.routes')
  app.use('/About_Us',AboutUsRoute)
 



  const LogsRoute = require('./Api/Routes/LoginDetails.routes')
  app.use('/LogsRoute',LogsRoute)
 



  const CategoryRoute = require('./Api/Routes/Categories.routes')
  app.use('/CategoryRoute',CategoryRoute)
 


  const IngRoute = require('./Api/Routes/Ingredients.routes')
  app.use('/IngApi',IngRoute)
 


  mongoose.connect(MONGODB, /*We place this to remove warning*/{ useNewUrlParser:
    true, useUnifiedTopology: true }).then(()=>{
    console.log("Connected to MongoDB database")
    }).catch((e)=>{console.log(e.message)})
  
  
  app.listen(PORT, () => {
    console.log(`gd Folder System listening on port ${PORT}`)
  })


