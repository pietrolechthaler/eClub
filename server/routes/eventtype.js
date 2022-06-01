const express = require('express');
const req = require('express/lib/request');
const router = express.Router();
const EventType = require('../models/EventType')
const bcrypt = require('bcryptjs')
const {eventTypeValidation}= require('../validation')
const verify = require('./verifyToken');

/* --- GET: all eventType --- */
router.get('/', verify, async(req, res) => {
    try{
        //loading all eventType
        const eventType = await EventType.find();
        res.json(eventType);
    }catch(err){
        res.status(500).json({ message: err });
    }
})
/* --- POST: creating one EventType --- */
router.post('/', verify, async (req, res) => {

    //validation data before creating EventType 
    const {error} = eventTypeValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    //checking if the event type is already in the database
    const eventTypeExist = await EventType.findOne({type: req.body.type});
    if(eventTypeExist) return res.status(400).send('Event Type already exists')

    //create new event type
    const eventType = new EventType({
        name: req.body.name,
        type: req.body.type
    })
    try{
        const savedEventType = await eventType.save();
        res.status(201).json({ eventType: eventType._id })
    }catch(err){
        res.status(400).json({ message: err });
    }
} )

/* --- DELETE: specific EventType --- */
router.delete('/:eventTypeId', verify, getEventType, async (req, res) => {
    try {
        const removedEventType = await res.eventType.remove()
        res.status(200).json({ message: 'Deleted event type' })
    }catch(err){
        res.status(500).json({ message: err.message })
    }
})

/* --- PATCH: update Event --- */
router.patch('/:eventTypeId', verify, async(req,res)=>{
    console.log(req.body);

    //checking if the eventType is already in the database
    const typeExist = await EventType.findOne({type: req.body.type});
    if(typeExist) return res.status(400).send('Type already exists')

    EventType.findByIdAndUpdate({
        _id:req.params.eventTypeId
    },{
        $set:req.body
    }).then(()=>{
        res.sendStatus({message:"Success"});
    }).catch(err => {
       res.status(500).send(err.message);
    })
});

/* --- FUNCTION: get Team --- */
async function getEventType(req, res, next) {
    let eventType
    try {
        eventType = await EventType.findById(req.params.eventTypeId)
        if (eventType == null) {
            return res.status(404).json({ message: 'Cannot find eventType' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.eventType = eventType
    next()
  }



module.exports = router;
