// const Post = require('../models/Post');
const LoginUser = require('../models/Login-user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

// const adminLayout = '../views/layout/admin';
// const EditLayout= '../views/layout/edit';

const loginLayout = '../views/layout/login';


exports.getLoginPage = async (req, res) => {
  try {
    const locals = {
      title: "Login",
      description: "Simple Blog created with NodeJs, Express & MongoDb."
    };
    if (req.session.isLoggedIn) {
      return res.redirect('/dashboard/:id'); // Redirect if already logged in
    }
    res.render('signup/signup', { locals ,layout: '../views/layout/login' });
  } catch (error) {
    console.log(error);
  }
};

// exports.getSigninPage = async (req, res) => {
//   try {
//     const locals = {
//       title: "Signin",
//       description: "Simple Blog created with NodeJs, Express & MongoDb."
//     };
//     res.render('signup/signup', { locals, layout: '../views/layout/signup' });
//   } catch (error) {
//     console.log(error);
//   }
// };

exports.getRegisterPage = async (req, res) => {
  try {
    const locals = {
      title: "Register",
      description: "Simple Blog created with NodeJs, Express & MongoDb."
    };
    res.render('signup/login', { locals, layout: '../views/layout/login' });
  } catch (error) {
    console.log(error);
  }
};


exports.postSignin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await LoginUser.findOne({ email });
    if (!user) {
      return res.redirect(`/login`);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.redirect(`/login`);
    }

    // console.log(`User Role: ${user.role}`); // Debugging log for role
    req.session.isLoggedIn = true; 
    const token = jwt.sign({ userId: user.id, role: user.role,name: user.name }, jwtSecret);
    res.cookie('token', token, { httpOnly: true,path: '/' });

    if (user.role === 'Admin') {
      return res.redirect(`/admindashboard`);
    } else if (user.role === 'User') {
      return res.redirect(`dashboard/:id`);
    } else {
      res.redirect('/login')
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.postRegister = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    console.log(req.body);
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      await LoginUser.create({ username, email, password: hashedPassword });
      res.redirect('/login');
    } catch (error) {
      console.error("Database Error: ", error); // Log detailed error
      if (error.code === 11000 && error.keyPattern.email) {
        res.status(409).json({ message: 'Email already in use' });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};