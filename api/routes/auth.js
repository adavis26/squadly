var express = require('express');
var router = express.Router();
const chatService = require('../services/chatService')

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header('Access-Control-Allow-Credentials', true); 
    res.send("hello")
});

router.post('/', async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header('Access-Control-Allow-Credentials', true); 
    // const message = req.body;
    // await chatService.insertMessage(message).then((data) => {
    //     res.send(data)
    // });

});

module.exports = router;