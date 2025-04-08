const mongoose = require('mongoose');

const GoalSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true, 
        trim: true 
    },
    description: { 
        type: String, 
        trim: true 
    },
    targetDate: { 
        type: Date, 
        required: true 
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    status: { 
        type: String, 
        enum: ['pending', 'in progress', 'completed'], 
        default: 'pending' 
    }
}, { timestamps: true });

module.exports = mongoose.model('Goal', GoalSchema);
