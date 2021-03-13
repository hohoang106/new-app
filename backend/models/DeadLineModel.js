const mongoose = require('mongoose');

const DeadLineModel = new mongoose.Schema({
    dateStart: {
        type: Date,
    },
    dateEnd: {
        type: Date
    },
    create_at: {
        type: Date,
        default: Date.now()
    }
})
DeadLineModel.index({
    dateEnd: 1
}, {
    expireAfterSeconds: 0
})

module.exports = mongoose.model('Deadline', DeadLineModel)