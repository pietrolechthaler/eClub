const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        min: 3,
        max: 255
    }, 
    password:{
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    name:{
        type: String,
        required: true,
        max: 255
    },
    surname:{
        type: String,
        required: true,
        max: 255
    },
    birth:{
        type: Date,
    },
    a_type:{
        type: mongoose.Schema.Types.ObjectId, ref: 'UserType',
        required: true
    },
    id_team:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Team',
    },
    zip:{
        type: String,
        max: 20
    }, 
    city:{
        type: String,
        max: 255
    },
    province:{
        type: String,
        max: 255
    },
    nation:{
        type: String,
        max: 255
    },
    street:{
        type: String,
        max: 255
    }, 
    phone:{
        type: String,
        max: 30
    },
    status:{
        type: Number,
        default: '0'
    },
    hidden:{
        type: Boolean,
        default: false
    },
    added_by:{
        type: String,
        required: true
    },
    created_at:{
        type: Date,
        default: Date.now,
        required: true
    },
    deleted_at:{
        type: Date,
    },
    updated_at:{
        type: Date
    }
})

module.exports = mongoose.model("User", UserSchema)


