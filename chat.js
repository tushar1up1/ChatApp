const mongoose = require('mongoose');
const Message = mongoose.model('Message');
let users = [];


const initializeChat = (app,http) => {
    const io = require('socket.io')(http);
    io.on("connection",socket => {

        socket.on("adduser", (_id) => {
             addUser(_id,io);   
        });

        socket.on("removeUser", (_id) => {
             removeUser(_id,io);
        });

        socket.on("sendMsg",(sendObj) => {
             sendMsg(sendObj,io);
        });

        socket.on("typing", (sendObj) => {
             typingMsg(sendObj,io);
        });

        io.emit("users",users);
    });
}

const sendMsg = async (sendObj,io) => {

    let fromId = sendObj.fromId;
    let toId = sendObj.toId;
    let message = sendObj.message;
    let timeStamp = sendObj.timeStamp;

    let newMessage = new Message();
    newMessage.fromId = fromId;
    newMessage.toId = toId;
    newMessage.message = message;
    newMessage.timeStamp = timeStamp;
    await newMessage.save();

    io.emit(toId,{fromId,toId,message,timeStamp});
}

const typingMsg = async (sendObj,io) => {
    let fromId = sendObj.fromId;
    let toId = sendObj.toId;
    let typing = sendObj.typing;

    io.emit(toId,{fromId,toId,typing});
}


const addUser = (_id,io) => {
    if(!users.includes(_id)){
        users.push(_id);
    }
    io.emit("users",users);
} 

const removeUser = (_id,io) => {
    
    users = users.filter( (id) => {
        if(_id == id) return false;
        return true;
    });
    io.emit("loggedOutUsers",_id);
    io.emit("users",users);
}

module.exports = initializeChat;


