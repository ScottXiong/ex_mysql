var express = require('express');
var router = express.Router();
var db=require('./database/db.js');
var table="regular_sentences";


/* GET users listing. */

/* GET users listing. */

router.get('/',(req,res,next)=>{
	var conn=db.create_connection_to_db();
	conn.connect();
    console.log("已成功连接数据库，正试图添加数据。。。")
	var docs={
        heading:req.body.heading,
        tag:req.body.tag,
        who:req.body.who,
        content:req.body.content,
        creat_time:new Date().getTime(),
        n:Math.floor(Math.random()*100)
    };
    
     // res.render('add',{})
	conn.query(`insert into ${table}(heading,tag,who,content,creat_time,n) values('${req.body.heading}','${req.body.tag}'
	,'${req.body.who}','${req.body.content}',now(),floor(rand()*100)) `, function(err, result) {//varchar 字段必须要加引号

    if (err) throw err;
    console.log("req.body:",req.body)
    console.log("数据添加成功")
    res.render('add',{})
   })
    conn.end();  
})

module.exports = router;
