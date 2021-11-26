var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const messageSchema = new Schema({
    message_type: {
        type: String,
    },
    sender_username: {
        type: String
    },
    sender_id: {
        type: Number
    },
    user_color: {
        type: String
    },
    chat_id: {
        type: String
    },
    buff: Buffer
}, {
    collection: 'message'
});

module.exports = mongoose.model('message', messageSchema);