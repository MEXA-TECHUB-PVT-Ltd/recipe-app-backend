const UserSchema = require('../../Model/UserModel/User.model')
const User = UserSchema.User_schema
const Otp_schema = require('../../Model/OtpModel/Otp.model')
const OTP = Otp_schema.Otp_schema
const { generateOTP } = require('../../Utils/Services/Otp')
const { sendMail } = require('../../Utils/Services/Mail')
const ResponseCode = require('../../Utils/Responses/ResponseCode')

const createUser = async (req,res)=>{
   
    console.log("create User Call")
   
    const {UserName,UserPass,UserEmail,User_Preferences, User_genere} = req.body
    
    const user= new User({
        UserName,
        UserPass,
        UserEmail,
        User_Preferences, 
        User_genere
    })
    if (!req.body.UserName) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
      }

    // save User into database

user.save(user)
  .then(data => {
    res.status(200).send({
      data,
      message:"User account created Successfully",
      resCode: ResponseCode.ACCOUNT_CREATED_SUCCESSFULLY
    });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the User.",
        resCode: ResponseCode.ERROR_MESSAGE
    });
  });
   
   
}


const UserSignIn= async (req,res)=>{
    console.log("User SignIn Call")
    const {UserName,UserPass}= req.body
   //  Validate request
   if (!UserName) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
      console.log("User req body data ",req.body)


       User.findOne({
        UserName:UserName
      })
        .exec((err, user) => {
          if (err) {
            res.status(500).send({ 
              message: err,
              resCode: ResponseCode.ERROR_MESSAGE
            });
            return;
          }
    
          if (!user) {
            return res.status(404).send({ message: "User Not found." });
          }
          console.log("here is admin pass ",user.UserPass)

          if(user.UserPass== UserPass){
            res.status(200).send({
               user,
                message:"User account Login Successfully",
                resCode:ResponseCode.LOGIN_SUCCESSFULL
              
              });
          }else{
            res.status(500).send({
                 
              message:"Incorrect Username and pass",
              resCode: ResponseCode.INCORECT_EMAIL_PASS
            }
               );
          }
          
        });
    }





    const User_ResetPassword= async(req,res)=>{
   
        let Userdata = await User.findOne({UserEmail:req.body.Email})
        
        const generatedOtp = generateOTP();
        console.log('Generated Otp',generateOTP)
        if(Userdata){
                let otpData = new OTP({
                Email:req.body.Email,
                Code: generatedOtp,
                ExpireIn: new Date().getTime() + 300*1000,
                PersonId: Userdata.id
            })
            console.log("user id ",Userdata.id)
             otpData.save(otpData).
             then( data => {
               
                 console.log("OTP data saved successfully")
              })
              .catch(err => {
                res.status(500).send({
                  message:
                    err.message || "Some error occurred while saving the otp"
                });
              });
    
              try {
                await sendMail({
                  to:req.body.Email,
                  OTP:generatedOtp,
                });
                res.status(200).send({
                    message: 'Please check your email for otp verification',
                    OTP:generatedOtp,
                  });
                 
              } catch (error) {
                res.status(500).send({
                    message: 'Unable to Send OTP, Please try again later'
                  });
         
    
              }
    
    
        }else{
            res.status(500).send({
                message: "Some error occurred while saving the otp"
              });
           
    
        }
    
     
    }
    
    
    
    const User_ChangePassword= async (req,res)=>{
      
        const {PersonId,Email,Code,newPass}= req.body
     
        let Otpdata = await OTP.find({PersonId,Email,Code})
        const response={}
         
        if(Otpdata){
           let currentTime = new Date().getTime()
           let diff = Otpdata.expireIn - currentTime
            
           if(diff<0){
            response.message = "Token Expire"
            response.statusText= 'error'
    
           }else{
            response.message = "Otp receive successfully"
            response.statusText= 'success'
          
    
            User.findOneAndUpdate({id:PersonId}, {
                $set:{UserPass:newPass}
            })
            .then(data => {
              if (!data) {
                res.status(404).send({
                  message: `Cannot update User Pass with id=${PersonId}. Maybe User was not found!`
                });
              } else res.send(
                {
                 message1: response.message,
                 status: response.statusText,
                 message: "User pass changes successfully.",
             
             });
            })
            .catch(err => {
              res.status(500).send({
                message: "Error updating User Pass with id=" + PersonId
              });
            });
    
            
           }
          
        }else{
                response.message = "Invalid Otp"
                response.statusText = "error"
            res.status(500).send({
                 message:response.message,
                 status:response.statusText
              });
         
        }
    
    
    }


 const ChangeWithConfirmPass = async (req,res)=>{
        const response={}
        const {id,OldPass,newPass}= req.body
        if (!req.body) {
            res.status(400).send({ message: "Content can not be empty!" });
            return;
          }

          let UserData = await User.find({id,UserPass:OldPass})
          console.log(UserData)
          if(UserData){
          User.findOneAndUpdate({id:id}, {
            $set:{UserPass:newPass}
        })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update User Pass with id=${UserData.id}. Maybe User was not found!`
            });
          } else res.send(
            {
             message1: response.message,
             status: response.statusText,
             message: "User pass changes successfully.",
         
         });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating User Pass with id=" + UserData.id
          });
        });
    }else{
        res.status(500).send({
            message: "Incorrect Old Password Entered"
          });  
    }
        
        
    }
    
    
    
    const ViewUser = async(req,res)=>{
      const {id} = req.body
      const Data = await User.findById(id)
      if(Data){
      res.status(200).send({
        Data,
        message:"User Found Successfully"
      });
    }else{
      res.status(500).send({
        message:"Error Finding User"
      });
    }
    }




  const UpdateUser = async(req,res)=>{
     const {id,UserEmail,User_Preferences,User_genere} = req.body
     if (!req.body) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
    
       if (!req.body) {
            res.status(400).send({ message: "Content can not be empty!" });
            return;
          }
    
          User.findByIdAndUpdate(id, {
            UserEmail,
            User_Preferences,
            User_genere
        }).then(data=>{
      res.status(200).send({
        message:" User updated successfully",

      });
           
    }).catch(err=>{
        res.status(500).send({
            message:
              err.message || "Some error occurred while updating User"
          });
    })


  }


  const DeleteUserAccount=async(req,res)=>{
    const {id} = req.body;
    console.log(id)
     
    if (!req.body.id) {
        res.status(400).send({ message: "User Id required to delete data" });
        return;
      }


    User.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete User with id=${id}. Maybe User was not found!`
          });
        } else {
          res.send({
            message: "User deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete User with id=" + id
        });
      });
  }

  const  ViewAllUsers = async (req,res)=>{
     
    const Data =  await User.find();
  console.log(Data)
  res.status(200).send(
    {
        Data,
        message:"User data found successfully"
    }
     ) 
  }


module.exports = {
    createUser,
    UserSignIn,
    User_ChangePassword,
    User_ResetPassword,
    ChangeWithConfirmPass,
    DeleteUserAccount,
    ViewUser,
    ViewAllUsers,
    UpdateUser
}

