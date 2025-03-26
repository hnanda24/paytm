const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {type:String, required:true},
    lastName: {type:String, required:true},
    username: {type:String, required:true, unique: true},
    email: {type:String, required:true, unique: true},
    password: {type:String, required:true, unique: true}
})

const User = mongoose.model("User", userSchema)

const accountSchema = new mongoose.Schema({
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    balance: {
        type: Number,
        required: true
    }
})

const Account = mongoose.model('Account', accountSchema)

module.exports = {
    User,
    Account
}

