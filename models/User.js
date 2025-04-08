const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        trim: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        trim: true 
    },
    password: { 
        type: String, 
        required: true 
    },
}, { timestamps: true });

// Hash password before saving if it's new or modified
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();  // Skip hashing if password wasn't modified

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);  // Propagate error if hashing fails
    }
});

module.exports = mongoose.model('User', UserSchema);

