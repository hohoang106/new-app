const mongoose = require('mongoose');

const signUpTemplate = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    isChecked: {
        type: Boolean,
        default: false
    },
    faculty: {
        type: String,
        default: "It"
    },
    role: {
        type: String,
        default: "Student"
    },
    submitId: {
        type: Array,
        default: []
    },
    dateStartDeadline: {
        type: Date,
    },
    dateEndDeadline: {
        type: Date,
    }
});

module.exports = mongoose.model('userTable', signUpTemplate)