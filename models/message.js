const mongoose = require('mongoose');
const MessageSchema = mongoose.Schema({
    fromId: {
        type:String,
        required:true
    },
    toId: {
        type:String,
        required:true
    },
    message: {
        type:String,
        required: true
    },
    timeStamp: {
        type:String,
        required: true
    }
},{collection: 'messages'});


mongoose.model('Message',MessageSchema);
