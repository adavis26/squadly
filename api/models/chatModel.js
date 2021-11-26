var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const chatSchema = new Schema({
    name: {
        type: String,
    },
    description: {
        type: String
    },
    members: {
        type: Array
    },
    messages: {
        type: Array
    },
    bg_color: {
        type: String
    },
    buff: Buffer
}, {
    collection: 'chat'
});

module.exports = mongoose.model('chat', chatSchema);