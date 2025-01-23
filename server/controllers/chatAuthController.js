 const LoginUser = require('../models/Login-user');
  const Chat =  require('../models/Chat');
 const bcrypt = require('bcrypt');
const chatLayout= '../views/layout/chat';






exports.getChatDashboard = async (req, res) => {
  try {
    const userId = req.userId;

    const data=[];
    const logineduser = await LoginUser.findById(userId);
    if (logineduser) {
      data.push(logineduser);
    } else {
      console.log("No user found with the given ID:", userId);
    }
    
  
    console.log("Logged-in user:", data);
    
    const users = await LoginUser.find({ _id: { $ne: userId },role: { $ne: "Admin" }});
  
    console.log(userId,users,"test");
    res.render('chat/chatdashboard', { data,users , layout:chatLayout  }); 
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Server Error');
  }
};

exports.postChatDashboard = async (req, res) => {
  try {
    const locals = {
      title: 'Dashboard - POST',
      description: 'Handling POST requests on the chat dashboard.'
    };
    const id = req.params.id; // Extract the `id` from the URL
    res.render('chat/chatdashboard', { locals,id, layout: chatLayout });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// exports.saveChat = async (req,res)=>{
//   try{
//      var chat = new chat({
//       sender_id:req.body.sender_id,
//       receiver_id:req.body.receiver_id,
//       message: req.body.message,
//      });
     
//      const newChat =await chat.save();
//      res.status(400).send({success:true,message:'chat saved',data:newChat})
//   }catch(error){
//     res.status(400).send({success:false,message:error.message})
//   }
// }



exports.saveChat = async (req, res) => {
  try {
    // Create a new chat object
    const newChat = new Chat({
      sender_id: req.body.sender_id,
      receiver_id: req.body.receiver_id,
      message: req.body.message,
    });

    // Save the chat to the database
    await newChat.save();
    // Send a success response
    res.status(200).send({
      success: true,
      message: 'Chat saved successfully',
      data: newChat,
    });
  } catch (error) {
    // Handle errors and send a failure response
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};



exports.saveUnchat = async (req, res) => {
  try {
    // Create a new chat object
    const newChat = new Chat({
      sender_id: req.body.sender_id,
      receiver_id: req.body.receiver_id,
      message: req.body.message,
    });

    // Save the chat to the database
    await newChat.save();

    // Send a success response
    res.status(200).send({
      success: true,
      message: 'Chat saved successfully',
      data: newChat,
    });
  } catch (error) {
    // Handle errors and send a failure response
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};


