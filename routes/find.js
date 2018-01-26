var express = require('express');
var router = express.Router();
var db=require('./database/db.js');
var moment=require('moment')
var table="regular_sentences";
/* GET users listing. */
router.get('/', function(req, res, next) {
	var conn=db.create_connection_to_db();
	conn.connect();
	conn.query('SELECT * from '+table, function(err, result) {
    if (err) throw err;
    // res.json({code:200,msg:"OK",result})
    result.forEach(function (i) {
      i.creat_time=moment(i.creat_time).format('YYYY-MM-DD HH:mm:ss');
    });
    res.render('find',{result});
    conn.end();
    }) 
  // res.send('respond with a resource find');
});

module.exports = router;
