const express = require('express');
const req = require('express/lib/request');
const router = express.Router();
const mongoose = require('mongoose');
const Attendance = require('../models/attendance.js')
const {attendanceValidation}= require('../validation')
const verify = require('./verifyToken');
const authorization = require('./authToken');

/* --- GET: all Attends --- */
router.get('/', verify, authorization, async(req, res) => {
    try{
        //loading all attendances
        const attendance = await Attendance.find().populate("player",["name","surname"]).populate("event",["title","date"]);
        res.status(200).json(attendance);
    }catch(err){
        res.status(500).json({ message: err });
    }
})

/* --- GET: Attendance by event --- */
router.get('/event/:eventId', verify, authorization, getAttendanceByEvent, async (req, res) => {
    res.status(200).json(res.attendance)
})

/* --- GET: Attendance by player --- */
router.get('/player/:playerId', verify, authorization, getAttendanceByPlayer, async (req, res) => {
    res.status(200).json(res.attendance)
})

/* --- POST: creating one Attendance --- */
router.post('/', verify, authorization, async (req, res) => {

    //validation data before creating Attendance 
    const {error} = attendanceValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    //checking if the attendance is already in the database
    const attendanceExist = await Attendance.findOne({event: req.body.event, player: req.body.player});
    if(attendanceExist) return res.status(400).send('Attendace already exists')

    //create new attendance
    var player = mongoose.Types.ObjectId(req.body.player);
    var event = mongoose.Types.ObjectId(req.body.event);
    
    const attendance = new Attendance({
        event: event,
        player: player,
        value: req.body.value,
        added_by: req.body.added_by,
    })
    try{
        const savedAttendance = await attendance.save();
        res.status(200).json({ attendance: attendance._id })
    }catch(err){
        res.status(500).json({ message: err });
        console.log("asd");
    }
} )

/* --- DELETE: specific Attendance --- */
router.delete('/:attendanceId', verify, authorization, getAttendance, async (req, res) => {
    try {
        //removing attendance
        const removedAttendance = await res.attendance.remove()
        res.status(200).json({ message: 'Deleted attendance' })
    }catch(err){
        res.status(500).json({ message: err.message })
    }
})

/* --- PATCH: update Attendance --- */
router.patch('/:attendanceId', verify, authorization, async(req,res)=>{
    try {
        const attendance = await Attendance.findById({_id: req.params.attendanceId})
        if(!attendance){
            return res.status(404).json("Attendance not found")
        }else{
            Attendance.updateOne({_id: req.params.attendanceId}, {$set:req.body}).exec()
            res.status(200).json({message: 'success'})
        }
    }catch(err){
        res.status(500).json({message: err.message})
    }
});

/* --- FUNCTION: get Attendance --- */
async function getAttendance(req, res, next) {
    let attendance
    try {
        attendance = await Attendance.findById(req.params.attendanceId);
        if (attendance == null) {
            return res.status(404).json({ message: 'Cannot find attendance' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.attendance = attendance
    next()
  }

  /* --- FUNCTION: get Attendance by Event --- */
async function getAttendanceByEvent(req, res, next) {
    let attendance
    try {
        attendance = await Attendance.find({event : req.params.eventId}).populate("player",["name","surname"]);
        if (attendance.length == "0") {
            return res.status(404).json({ message: 'Cannot find attendance' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.attendance = attendance
    next()
  }
   /* --- FUNCTION: get Attendance by Player --- */
async function getAttendanceByPlayer(req, res, next) {
    let attendance
    try {
        attendance = await Attendance.find({player : req.params.playerId}).populate("event",["title","date"]);
        if (attendance.length == "0") {
            return res.status(404).json({ message: 'Cannot find attendance' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.attendance = attendance
    next()
  }

module.exports = router;
