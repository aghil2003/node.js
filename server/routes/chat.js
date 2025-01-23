const express = require('express');
const router = express.Router();

const chatauthcontroller= require('../controllers/chatAuthController')
const authMiddleware = require('../middleware/authMiddleware');



 router.get('/chatdashboard', authMiddleware,chatauthcontroller.getChatDashboard);
 router.post('/chatdashboard',authMiddleware, chatauthcontroller.postChatDashboard);
 router.post('/saveChat',authMiddleware, chatauthcontroller.saveChat)
 
 
 


 module.exports = router;