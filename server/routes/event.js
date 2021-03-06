const express = require('express');
const mongoose = require('mongoose');
const req = require('express/lib/request');
const router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

const bcrypt = require('bcryptjs')
const {eventValidation}= require('../validation')
const verify = require('./verifyToken');
const authorization = require('./authToken');


/* --- Importing models--- */
const Event = require('../models/event.js');
const EventType = require('../models/eventtype.js');
const User = require('../models/user.js');
const Attendance = require('../models/attendance.js');
const Summoning = require('../models/summoning.js');
const Evaluation = require('../models/evaluation.js');

/* --- GET: all Events --- */
router.get('/', verify, authorization, async(req, res) => {
    try{
        //loading all events
        const events = await Event.find().populate("teams",["category"]).populate("e_type",["name"]);
        res.json(events);
    }catch(err){
        res.status(500).json({ message: err });
    }
})

/* --- GET: specific Event --- */
router.get('/:eventId', verify, authorization, getEvent, async (req, res) => {
    res.json(res.event)
})

/* --- GET: Events by Team --- */
router.get('/team/:teamId', verify, authorization, getEventByTeam, async (req, res) => {
    res.json(res.event)
})


/* --- POST: creating one Event --- */
router.post('/', verify, authorization, async (req, res) => {

    //validation data before creating event 
    const {error} = eventValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    //checking if the attendance is already in the database
    const eventExist = await Event.findOne({title: req.body.title, teams: req.body.teams, date:req.body.date});
    if(eventExist) return res.status(400).send('Event already exists')

    //create new event
    const event = new Event({
        title: req.body.title,
        date: req.body.date,
        description: req.body.description,
        teams:req.body.teams,
        e_type:req.body.e_type,
        added_by: req.body.added_by,
    })
    try{
        const savedEvent = await event.save();
        res.status(200).json({ event: event._id })
    }catch(err){
        res.status(500).json({ message: err });
    }

    const event_type= await EventType.findById(req.body.e_type);

    if(event_type.type!=0){
        var players=[];
        req.body.teams.forEach(async element =>  {
            players= await User.find({team_id:new ObjectId(element)}).populate({path: 'a_type'});
            players.forEach(ga => {
                if(ga.a_type.type==0){
                    createAttendence(ga.id);
                    if(event_type.type==1){ //partita
                        createSummoning(ga._id);
                        createEvaluation(ga._id);
                    } 
                }  
            });
        });
    }

    async function createAttendence(ga_id){
        const attendance = new Attendance({
            event: event._id,
            player: ga_id,
            value: false,
            added_by: req.body.added_by,
        })
        try{
            const savedAttendance = await attendance.save();
        }catch(err){
            console.log(err)
        }
    }
    async function createSummoning(ga_id){
        const summoning = new Summoning({
            event: event._id,
            player: ga_id,
            value: false,
            added_by: req.body.added_by,
        })
        try{
            const savedAttendance = await summoning.save();
        }catch(err){
            console.log(err)
        }
    }
    async function createEvaluation(ga_id){
        const evaluation = new Evaluation({
            event: event._id,
            player: ga_id,
            value: 0,
            added_by: req.body.added_by,
        })
        try{
            const savedAttendance = await evaluation.save();
        }catch(err){
            console.log(err)
        }
    }
} )

/* --- DELETE: specific Event --- */
router.delete('/:eventId', verify, authorization, getEvent, async (req, res) => {
    try {
        //removing event
        const removedEvent = await res.event.remove()
        res.status(200).json({ message: 'Deleted event' })
    }catch(err){
        res.status(500).json({ message: err.message })
    }
})

/* --- PATCH: update Event --- */
router.patch('/:eventId', verify, authorization, async(req,res)=>{
    try {
        const event = await Event.findById({_id: req.params.eventId})
        if(!event){
            return res.status(404).json("event not found")
        }else{
            Event.updateOne({_id: req.params.eventId}, {$set:req.body}).exec()
            res.status(200).json({ message: 'success' })
        }
    }catch(err){
        res.status(500).json({ message: err.message })
    }
});

/* --- FUNCTION: get Event --- */
async function getEvent(req, res, next) {
    let event
    try {
        event = await Event.findById(req.params.eventId).populate("teams",["category"]).populate("e_type",["name"]);
        if (event == null) {
            return res.status(404).json({ message: 'Cannot find event' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.event = event
    next()
  }

/* --- FUNCTION: get Event by Team --- */
async function getEventByTeam(req, res, next) {
    let event
    try {
        event = await Event.find({teams : req.params.teamId}).populate("teams",["category"]).populate("e_type",["name"]);
        if (event.length==0) {
            return res.status(404).json({ message: 'Cannot find event' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.event = event
    next()
  }

module.exports = router;
