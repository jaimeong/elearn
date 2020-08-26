const express = require('express')
const Course = require('../models/course')
const router = express.Router()


router.get('/new', (req,res) => {
    res.render('courses/new', {course: new Course()})
})

router.get('/:slug', async (req, res) => {
    const course = await Course.findOne({ slug: req.params.slug })
    if (course == null) res.redirect('/')
  
    res.render('courses/show', { course: course, user: req.user })
  })


router.get('/edit/:id', async (req, res) => {
  const course = await Course.findById(req.params.id)


  res.render('courses/edit', { course: course })
})


router.put('/:id', async (req, res, next) => {
    req.course = await Course.findById(req.params.id)
    const course = new Course({
        title: req.body.title,
        headline: req.body.headline,
        desc1: req.body.desc1,
        pic1: req.body.pic1,
        video: req.body.video
    })

    try{
        await course.save()
        res.redirect('/')
    }
    catch (e){
        res.render(`courses/edit`, { course: course })
    }
})

router.post('/', async (req, res, next) => {
    const course = new Course({
        title: req.body.title,
        headline: req.body.headline,
        desc1: req.body.desc1,
        desc2: req.body.desc2,
        desc3: req.body.desc3,
        pic1: req.body.pic1,
        pic2: req.body.pic2,
        pic3: req.body.pic3,
        video: req.body.video
    })

    try{
        await course.save()
        res.redirect('/')
    }
    catch (e){
        res.render(`courses/new`, { course: course })
    }
})


  
module.exports = router