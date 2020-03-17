var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
    },
    squads: {
        type: Array
    },
    buff: Buffer
}, {
    collection: 'user'
});

module.exports = mongoose.model('user', userSchema);