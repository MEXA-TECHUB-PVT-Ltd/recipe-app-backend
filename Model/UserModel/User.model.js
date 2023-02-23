const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

    UserCountry: {
        type: String,
        required: true,
    },
    UserDeviceID: {
        type: String,
        required: true,
    },

    User_Preferences: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserPref'
    },

    User_genere: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserGenere'
    },
    location: String,
    isLogin: Boolean

}
)

module.exports = mongoose.model("Users", UserSchema);


