const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
  const token = req.cookies.token;
  console.log(token);
  
  if (!token) {
    res.redirect(`/`)
    return res.status(401).json({ message: 'Unauthorized' });
    
  } 
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.userId = decoded.userId;
    req.userName = decoded.name;
    console.log(req.userName);
    
    if(!req.userId){
      res.redirect(`/`)
    }else{
      next();
    }
    
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

