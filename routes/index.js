const express = require('express');
const router = express.Router();
const loginCtrl = require('./../controllers/LoginController');
const homeCtrl = require('./../controllers/HomeController');

router.post('/getUsers',homeCtrl.getListUsers);
router.post('/login',loginCtrl.loginUser);
router.get('/logout',loginCtrl.logoutUser);
router.post('/register',loginCtrl.registerUser);
router.get('/checkUserLogged',loginCtrl.userLoggedIn);
router.post('/getMessages',homeCtrl.getUserMessages);
router.get('/getDate',homeCtrl.getDate);

module.exports = router;