const express = require('express');
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv').config();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('App listening on port ' + port));

app.set('view engine', 'ejs')


// connect to db
const uri = process.env.ATLAS_URI

  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  const connection = mongoose.connection
  connection.once('open', ()=>{
      console.log("MongoDB Atlas connected")
  })



const Course = require('./models/course')



// super important
// allows you to access req.body attributes from form
// make sure it comes before routers
app.use(express.urlencoded({extended: false}))


const methodOverride = require('method-override')
app.use(methodOverride('_method'))



app.get('/', async(req, res)=>{
    const courses = await Course.find().sort({
        createdAt: 'desc'
    })


    // const courses = [{
    //   title: 'Test Course',
    //   createdAt: new Date(),
    //   headline: 'Test Headline',
    //   desc1: 'test Description',
    //   pic1: 'test pic',
    //   video: 'test video'
    // },
    // {
    //   title: 'Java Course',
    //   createdAt: new Date(),
    //   headline: 'Java is in 3 billion devices',
    //   desc1: 'Learn OOP!',
    //   pic1: 'test pic',
    //   video: 'test video'
    // }]



  
    if(req.user && req.user.admin === true){
      res.redirect("/admin");
    }
    else{
      res.render('courses/index', { courses : courses})
    }
})


const courseRouter = require('./routes/course');
const appointmentRouter = require('./routes/appointment');
app.use('/courses', courseRouter)
app.use('/app', appointmentRouter)
