var express = require('express');
var router = express.Router();
const chatService = require('../services/chatService')


var io = require('socket.io')();

io.set('origins', '*:*');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header('Access-Control-Allow-Credentials', true); 
    const chat = chatService.getChat()
    // const chat = chatService.getChat();
    // chat.then(data => {
    //     res.json(data)
    // })
    res.json({
        "test":"messge"
    })
});

router.post('/insert', async (req, res, next) => {
    // const chat = chatService.getChat();
    // console.log(req.body);
    res.header("Access-Control-Allow-Origin","*");
    const message = req.body;
    await chatService.insertMessage(message).then((data) => {
        res.send(data)
    });

});

// router.post('/stream', async (req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "http://localhost:4200");
// });



// io.on('connection', function (socket) {
//     socket.emit('message', {
//         hello: 'world'
//     });
//     socket.on('message', function (data) {
//         //console.log(data);
//     });
// })


module.exports = router;