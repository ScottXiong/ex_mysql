var express = require('express');
var router = express.Router();
var app=express();
/* GET users listing. */
app.post('/', function(req, res, next) {
  res.send('respond with a resource remove');
});

module.exports = router;
