const express = require('express')
const Course = require('../models/course')
const Appointment = require('../models/appointment')
const router = express.Router()




router.get('/admin', async (req,res)=>{

     const appointments = await Appointment.find().sort({
        createdAt: 'desc'
    })


    res.render('appointment/index', {appointments: appointments})

})

router.get('/schedule', (req,res) => {
    res.render('appointment/new', {appointment: new Appointment()})
})


router.post('/', async (req, res, next) => {
    const appointment = new Appointment({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phonenumber: req.body.phonenumber,
        course: req.body.course,
        avaliability: req.body.avaliability
    })
    try{
        await appointment.save()
        res.redirect('/')
    }
    catch (e){
        console.log(e)
        res.render(`appointment/new`, { appointment: appointment })
    }
})


router.delete('/:id', async (req, res) => {
  await Appointment.findByIdAndDelete(req.params.id)
  res.redirect('/app/admin')
})

  
module.exports = router