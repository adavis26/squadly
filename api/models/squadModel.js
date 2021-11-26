var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const squadSchema = new Schema({
    name: {
        type: String,
    },
    description: {
        type: String
    },
    members: {
        type: Array
    },
    chats: {
        type: Array
    },
    bg_color: {
        type: String
    },
    buff: Buffer
}, {
    collection: 'squad'
});

module.exports = mongoose.model('squad', squadSchema);