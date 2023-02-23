const UserGenereModel = require("../../Model/UserGenereModel.js/userGenere.model");
const mongoose = require("mongoose");

exports.getAllUserGenere = (req, res) => {
    UserGenereModel.find({}, function (err, foundResult) {
        try {
            res.json(foundResult)
        } catch (err) {
            res.json(err)
        }
    })
}
// Get UserGenere 
exports.getUserGenere = (req, res) => {
    const UserGenereId = req.params.UserGenereId;
    UserGenereModel.find({ _id: UserGenereId }, function (err, foundResult) {
        try {
            res.json({ data: foundResult })
        } catch (err) {
            res.json(err)
        }
    })
}
exports.deleteUserGenere = (req, res) => {
    const UserGenereId = req.params.UserGenereId;
    UserGenereModel.deleteOne({ _id: UserGenereId }, function (err, foundResult) {
        try {
            res.json(foundResult)
        } catch (err) {
            res.json(err)
        }
    })
}
exports.createUserGenere = async (req, res) => {
    const UserGenere = new UserGenereModel({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
    });
    try {
        const savedAdmin = await UserGenere.save();
        res.json({
            data: savedAdmin,
            message: "User Genere Created successfully"
        })
    } catch (err) {
        res.status(400).send(err);
    }
}
exports.updateUserGenere = async (req, res) => {
    const updateData = {
        name: req.body.name,
    }
    const options = {
        new: true
    }
    UserGenereModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.json(error.message)
        } else {
            res.send({data:result,message:"Updated Successfully"})
        }
    })
}
