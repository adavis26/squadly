var express = require('express');
var router = express.Router();
const userService = require('../services/userService')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req, res, next) {
  // userService.newUser(req);
  res.send('added user');
});

module.exports = router;
