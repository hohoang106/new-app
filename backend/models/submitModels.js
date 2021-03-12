const mongoose = require('mongoose');

const submitTemplateCopy = new mongoose.Schema({
    title: {
        type: String,
        default: "img",
        required: true
    },
    description: {
        type: String
    },
    imageFiles: {
        type: Array,
        default: []
    },
    isChecked: {
        type: Boolean,
        default: false
    },
    docsUrl: {
        type: String,
        required: true
    },
    docsName: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('submitTable', submitTemplateCopy)