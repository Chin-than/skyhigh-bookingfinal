// File: models/User.js

const mongoose = require('mongoose');

const UserSchema = new  mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Stored HASHED
    
    // Optional fields from your types.ts
    phone: String,
    dob: Date,
    address: String,
    gender: { type: String, enum: ['Male', 'Female', 'Other', 'Prefer not to say'] },
    nationality: String,

    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);