var express = require('express');
var router = express.Router();
var db=require('./database/db.js');
var table="regular_sentences";
/* GET users listing. */
// app.get('/api/find/:id',(req,res)=>{
// 	creaateCon()
// 	conn.connect();
// 	conn.query('SELECT * from goods where id='+req.params.id, function(err, result) {
//     if (err) throw err;
//     res.json({code:200,msg:"OK",result})
//     })
// 	 conn.end();
// 	 })


router.get('/', function(req, res, next) {
	console.log('当前访问的数据库：scott，表名为'+table)
	console.log('当前请求的url地址为:'+req. _parsedOriginalUrl.path);
	//js将字符串转化为数组
	var path=req. _parsedOriginalUrl.path;
	var Array_path=path.split('/');
	var id=Array_path[Array_path.length-1];
	console.log("当前请求的id为："+id)
	var conn=db.create_connection_to_db();
	conn.connect();
	conn.query('SELECT * from '+table+' where id='+id, function(err, result) {
    if (err) throw err;
    console.log("当前访问数据为"+JSON.stringify(result))
    res.json({code:200,msg:"OK",result})
    conn.end();
    }) 
  // res.send('respond with a resource find'+id);
});

module.exports = router;
