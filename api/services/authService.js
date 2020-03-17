const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const connection = mongoose.connection;
var Chat = require('../models/messageModel');

const login = async function () {

    mongoose.connect('mongodb://localhost/squadly', {
        useNewUrlParser: true
    });

    var db = mongoose.connection;

    let _chat;

    _chat = await Chat.find({}, {}, (err, data) => {
        if (err) {
            console.log(err)
        };
        // console.log(data);
        return data
    })

    return _chat;

}


module.exports = {
    login
}