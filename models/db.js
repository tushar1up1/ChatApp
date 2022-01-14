const mongoose = require("mongoose");
const dbURI = 'mongodb+srv://tushar:covid19@cluster0-fxprk.mongodb.net/chat-app?retryWrites=true&w=majority';
mongoose.connect(dbURI);
mongoose.connection.on('connected',() => {
    console.log('connected to app');
});
mongoose.connection.on("error", err => {
    console.log('disconnected');
});

require('./user');
require('./message');
