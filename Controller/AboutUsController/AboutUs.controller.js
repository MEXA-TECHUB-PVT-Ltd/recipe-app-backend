const AboutUs = require('../../Model/AboutUs/AboutUsModel')
const ResponseCode = require('../../Utils/Responses/ResponseCode')
const mongoose = require('mongoose');

const CreateAboutUs = (req,res)=>{
      
    const RecipeData = new AboutUs({
        _id: mongoose.Types.ObjectId(),
        Title: req.body.Title,
        Description:req.body.Description
    
      });
      RecipeData.save((error, result) => {
        if (error) {
          res.send(error)
        } else {
          res.json({ data: result, message: "Created Successfully" })
         
        }
      })
   
}


const DeleteAboutUs =(req,res)=>{
    const {id} = req.body;
    console.log(id)
     
    if (!req.body.id) {
        res.status(400).send({ message: "AboutUs Id required to delete data" });
        return;
      }


    AboutUs.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete AboutUs with id=${id}. Maybe AboutUs was not found!`
          });
        } else {
          res.send({
            message: "AboutUs deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete AboutUs with id=" + id
        });
      });
}


const UpdateAboutUs = (req,res)=>{
    const {
        id,
        Title,
        Description
  
    }  = req.body

        if(!req.body){
            res.status(400).send({ message: "No Data Found To Update" });
            return;
        }

        AboutUs.findByIdAndUpdate(id, {
            Title,
            Description
        }).then(data=>{
      res.status(200).send({
        message:" AboutUs updated successfully",

      });
          
    }).catch(err=>{
        res.status(500).send({
            message:
              err.message || "Some error occurred while updating AboutUs"
          });
    })
}


const ViewAllAbout =async (req,res)=>{
   
    const Data =  await AboutUs.find();
  console.log(Data)
  res.status(200).send(
    {
        Data,
        message:"AboutUs data found successfully"
    }
     ) 
}


const ViewAboutUs =async (req,res)=>{
    const {id} = req.body
    const Data = await AboutUs.findById(id)
    if(Data){
    res.status(200).send({
      Data,
      message:"AboutUs Found Successfully"
    });
  }else{
    res.status(500).send({
      message:"Error Finding AboutUs"
    });
  }
}


module.exports = {
  CreateAboutUs,
  UpdateAboutUs,
  DeleteAboutUs,
  ViewAllAbout,
  ViewAboutUs
}