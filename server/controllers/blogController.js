const Post = require('../models/Post');
 const LoginUser = require('../models/Login-user');

 

const adminLayout = '../views/layout/admin';
const EditLayout= '../views/layout/edit';
const chatLayout= '../views/layout/chat';





exports.getDashboard = async (req, res) => {
  try {
    const locals = {
      title: 'Dashboard',
      description: 'Simple Blog created with NodeJs, Express & MongoDb.'
    };

    const userId = req.userId;
    
    let userdata=[]
    const user = await LoginUser.findById(userId)
    userdata.push(user)
    console.log(userdata,"user");
    
    const data = await Post.find({ userId,isActive: true }).sort({ createdAt: -1 });
    console.log(data);
    
    res.render('signup/dashboard', { locals, data,userdata, layout: '../views/layout/signup' });
  } catch (error) {
    console.log(error);
  }
};
exports.getPostDashboard = async (req, res) => {
  try {
    const locals = {
      title: 'Dashboard',
      description: 'Simple Blog created with NodeJs, Express & MongoDb.'
    };
    res.render('post ', { locals , layout:EditLayout });
  } catch (error) {
    console.log(error);
  }
};

exports.getNewPostPage = async (req, res) => {
  try {
    const locals = {
      title: 'Add Post',
      description: 'Simple Blog created with NodeJs, Express & MongoDb.'
    };
    res.render('signup/add-post', { locals, layout:EditLayout });
  } catch (error) {
    console.log(error);
  }
};

exports.postNewPost = async (req, res) => {
  try {
    const userId = req.userId;
    const newPost = new Post({
      title: req.body.title,
      body: req.body.Body,
      userId
    });
    await newPost.save(); 
    res.redirect(`/dashboard/${userId}`);
  } catch (error) {
    console.log(error);
  }
};

exports.getEdituserPage = async (req, res) => {
  try {
    const locals = {
      title: 'Edit Post',
      description: 'Free NodeJs User Management System.'
    };
    const data = await Post.findOne({ _id: req.params.id });
    res.render('signup/post-edit', { locals, data, layout:EditLayout });
  } catch (error) {
    console.log(error);
  }
};

exports.putEditPost = async (req, res) => {
  try {
    await Post.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      body: req.body.Body,
      updatedAt: Date.now()
    });
    res.redirect(`/dashboard/${req.userId}`);
  } catch (error) {
    console.log(error);
  }
};




exports.Postdelete = async (req, res) => {
  try {
    // Update the isActive field to false instead of deleting the post
    const result = await Post.updateOne(
      { _id: req.params.id }, // Find the post by its ID
      { $set: { isActive: false } } // Set the isActive field to false
    );

    if (result.nModified === 0) {
      return res.status(404).json({ error: 'Post not found or already inactive' });
    }

    res.status(200).json({ message: 'Post is now inactive successfully' });
  } catch (error) {
    console.error(`Error updating post: ${error.message}`);
    res.status(500).json({ error: 'Failed to update the post' });
  }
};


exports.logout = (req, res) => {
  res.clearCookie('token', { path: '/' });
  req.session.destroy((err) => {
    if (err) {
      return res.send('Error logging out.');
    }
  });
  res.redirect('/');

};






// Admin Dashboard
exports.getAdminDashboard = async (req, res) => {
  try {
    const locals = {
      title: 'Dashboard',
      description: 'Simple Blog created with NodeJs, Express & MongoDb.',
    };

    const userId = req.userId;
    
    let userdata=[]
    const user = await LoginUser.findById(userId)
    userdata.push(user)
    console.log(userdata,"user");
    const data = await Post.find({ isActive: true });
    res.render('admin/dashboard', { locals, data,userdata, layout: adminLayout });
  } catch (error) {
    console.error(error);
  }
};

// Admin - Add Post Page
exports.getAddPostPage = (req, res) => {
  const locals = {
    title: 'Add Post',
    description: 'Simple Blog created with NodeJs, Express & MongoDb.',
  };
  res.render('admin/add-post', { locals, layout: EditLayout });
};

// Admin - Create New Post
exports.createPost = async (req, res) => {
  try {
    const userId = req.userId;
    const newPost = new Post({
      title: req.body.title,
      body: req.body.Body,
      userId
    });
    await newPost.save(); 
    res.redirect('/admindashboard');
  } catch (error) {
    console.log(error);
  }
};

// Admin - Edit Post Page
exports.getEditPostPage = async (req, res) => {
  try {
    const locals = {
      title: 'Edit Post',
      description: 'Edit Post Details',
    };

    const data = await Post.findOne({ _id: req.params.id });
    res.render('admin/edit-post', { locals, data, layout: EditLayout });
  } catch (error) {
    console.error(error);
  }
};


// Admin - Update Post
exports.updatePost = async (req, res) => {
  try {
    const postId = req.params.id;

    // Update the post in the database
    await Post.findByIdAndUpdate(postId, { 
      title: req.body.title,
      body: req.body.Body, });

    // Redirect to the dashboard after updating
    res.redirect('/admindashboard');
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Admin - Delete Post
exports.deletePost = async (req, res) => {
  try {
    // Update the isActive field to false instead of deleting the post
    const result = await Post.updateOne(
      { _id: req.params.id }, // Find the post by its ID
      { $set: { isActive: false } } // Set the isActive field to false
    );

    if (result.nModified === 0) {
      return res.status(404).json({ error: 'Post not found or already inactive' });
    }

    res.status(200).json({ message: 'Post is now inactive successfully' });
  } catch (error) {
    console.error(`Error updating post: ${error.message}`);
    res.status(500).json({ error: 'Failed to update the post' });
  }
};




