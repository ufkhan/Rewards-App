const mongoose = require('mongoose');

const recordSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    amount: {
        type: Number,
    }
})

module.exports = mongoose.model('Record', recordSchema);