require('dotenv').config();

const express = require('express');
const expressLayout=require('express-ejs-layouts');
const mathodOverride =require('method-override');
const cookieParser = require('cookie-parser');
const session= require('express-session');
const MongoStore = require('connect-mongo');

const connectDB=require('./server/config/db')

const app= express();
const PORT= process.env.PORT || 5000;

// connect to db
connectDB();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
app.use( mathodOverride('_method'));

app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized:true,
    store:MongoStore.create({
      mongoUrl:process.env.MONGO_URL
    })
}))

app.use(express.static('public'))

//templating Engine
app.use(expressLayout);
app.set('layout','./layout/main');
app.set('view engine','ejs');
 
app.use('/',require('./server/routes/main'));
app.use('/',require('./server/routes/login'))



app.listen(PORT,()=>{
    console.log(`server is running on port:${PORT}`);
})