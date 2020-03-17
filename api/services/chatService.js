const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = mongoose.connection;
var Message = require('../models/messageModel');
var Chat = require('../models/chatModel');

const getChat = async function (chatID) {

    let _chat;

    _chat = await Message.find({
        chat_id: chatID.chat_id
    }, {}, (err, data) => {
        if (err) {
            throw err;
        };
        return data
    })

    return _chat;
}

const getChats = async function (squadID) {

    let _chats;

    // TODO only return what is needed
    _chats = await Chat.find({}, {}, (err, data) => {
        if (err) {
            console.log(err);
        };
        return data
    });

    return _chats;

}

const insertMessage = async function (req) {
    
    const filter = {}
    return await Chat.findOneAndUpdate(message);
}

const newChat = async function (_chat) {

    spoof_chat = {
        name: "cool jawns",
        description: "just cool guys man",
        members: [],
        messages: [],
        bg_color: '#EF476F'
    }

    Chat.create(spoof_chat);
}

const addMemberToChat = async function (userID) {

}

module.exports = {
    getChat,
    getChats,
    newChat,
    insertMessage,
    addMemberToChat
}