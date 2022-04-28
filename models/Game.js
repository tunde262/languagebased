const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    user_1: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    user_2: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    ready_1: {
        type: Boolean,
        default: false
    },
    ready_2: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('user', UserSchema);