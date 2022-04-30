const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    user_1: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    user_2: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        default: null
    },
    ready_1: {
        type: Boolean,
        default: false
    },
    ready_2: {
        type: Boolean,
        default: false
    },
    language: {
        type: String,
        required: true
    },
    score_1: {
        type: Number,
        default: 0
    },
    score_1_done: {
        type: Boolean,
        default: false
    },
    score_2: {
        type: Number,
        default: 0
    },
    score_2_done: {
        type: Boolean,
        default: false
    },
    questions: {
        type: Number,
        default: 4
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Game = mongoose.model('game', UserSchema);