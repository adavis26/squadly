const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const connection = mongoose.connection;
var User = require('../models/userModel');

const newUser = async function (user) {

    mongoose.connect('mongodb://localhost/squadly', {
        useNewUrlParser: true
    });
    
    var db = mongoose.connection;
    const user_ = User(user);

    return await user_.save()

}


module.exports = {
    newUser
}