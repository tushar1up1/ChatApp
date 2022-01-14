const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    userName: {
        type:String,
        required:true,
        minLength:3
    },
    password: {
        type:String,
        required: true
    }
},{collection: 'users'});


mongoose.model('User',UserSchema);
