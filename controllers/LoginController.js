const mongoose = require('mongoose');
const User = mongoose.model('User');

const logoutUser = (req,res) => {
     req.session.destroy();
     res.status(200).json({});
     return;
}

const userLoggedIn = (req,res) => {
    let _id = "";
    if(req.session && req.session.loggedInUser)
        _id = req.session.loggedInUser._id;
    res.status(200).json({_id:_id});
}
 
const loginUser = async (req,res) => {
     
     const body = req.body;
     const userName = body.userName;
     const password = body.password;
     let userObj;
     try{
        userObj = await User.findOne({userName:userName,password:password});
     }catch(error)
     {
        res.status(400).json(error);
        return;   
     }
     if(userObj == null || !userObj)
     {
        res.status(400).json({"message":"user not found, please register"});
        return;
     }
     else
     {
        let loggedInUser = {userName:userObj.userName,_id:userObj._id};
        req.session.loggedInUser = loggedInUser;
        res.status(200).json(loggedInUser);
        return;
     }

}

const registerUser = async (req,res) => {
     
     const body = req.body;
     const userName = body.userName;
     const password = body.password;

     let userObj;
     let newUser;
     try{
        userObj = await User.findOne({userName:userName});
     }catch(error)
     {
         res.status(400).json(error);
         return;
     }
     if(userObj == null || !userObj)
     {
         try{
            newUser = new User();
            newUser.userName = userName;
            newUser.password = password;
            newUser = await newUser.save();
            res.status(200).json({userName:newUser.userName,_id:newUser._id});
            return;
         }
         catch(error)
         {
            res.status(400).json(error);
            return;
         }
     }
     else
     {
         res.status(400).json({"message":"user already exists"});
         return;
     }
}


module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    userLoggedIn
}