const UserPreferenceModel = require("../../Model/UserPreferenceModel/userPreference.model");
const mongoose = require("mongoose");

exports.getAllUserPref = (req, res) => {
    UserPreferenceModel.find({}, function (err, foundResult) {
        try {
            res.json(foundResult)
        } catch (err) {
            res.json(err)
        }
    })
}
// Get UserPref 
exports.getUserPref = (req, res) => {
    const UserPrefId = req.params.UserPrefId;
    UserPreferenceModel.find({ _id: UserPrefId }, function (err, foundResult) {
        try {
            res.json({ data: foundResult })
        } catch (err) {
            res.json(err)
        }
    })
}
exports.deleteUserPref = (req, res) => {
    const UserPrefId = req.params.UserPrefId;
    UserPreferenceModel.deleteOne({ _id: UserPrefId }, function (err, foundResult) {
        try {
            res.json(foundResult)
        } catch (err) {
            res.json(err)
        }
    })
}
exports.createUserPref = async (req, res) => {
    const UserPref = new UserPreferenceModel({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
    });
    try {
        const savedAdmin = await UserPref.save();
        res.json({
            data: savedAdmin,
            message: "User Preference Created successfully"
        })
    } catch (err) {
        res.status(400).send(err);
    }
}
exports.updateUserPref = async (req, res) => {
    const updateData = {
        name: req.body.name,
    }
    const options = {
        new: true
    }
    UserPreferenceModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.json(error.message)
        } else {
            res.send({data:result,message:"Updated Successfully"})
        }
    })
}
