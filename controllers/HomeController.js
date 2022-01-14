const mongoose = require('mongoose');
const User = mongoose.model('User');
const Message = mongoose.model('Message');
const ObjectId = mongoose.Types.ObjectId;

const getListUsers = async (req,res) => {
    let usersIdArr = req.body;
    usersIdArr = usersIdArr.map( (el) => ObjectId(el));
    let users = await User.aggregate([
        { "$project": {
            "_id": 1,
            "userName":1
        }}
    ]).match({_id:{$in:usersIdArr}});
    res.status(200).json(users);
    return;
}

const getUserMessages = async(req,res) => {
    
    let toId = req.body.toId;
    let fromId = req.body.fromId;
    let fromMesssages = await Message.aggregate().match({toId:toId,fromId:fromId});
    let toMessages = await Message.aggregate().match({toId:fromId,fromId:toId});
    let totalMessages = fromMesssages.concat(toMessages);
    res.status(200).json(totalMessages);
    return;
}

const getDate = (req,res) => {
    const nDate = new Date().toLocaleString('en-US', {
        timeZone: "Asia/Kolkata"
    });
    res.status(200).json(nDate);
    return;
}

module.exports = {
    getListUsers,
    getUserMessages,
    getDate
}