const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    type: { 
        type: String, 
        required: true, 
        trim: true 
    },
    duration: { 
        type: Number, 
        required: true 
    },
    caloriesBurned: { 
        type: Number, 
        required: true 
    }
}, { timestamps: true });

// Prevent model overwrite issue
module.exports = mongoose.models.Workout || mongoose.model('Workout', WorkoutSchema);
