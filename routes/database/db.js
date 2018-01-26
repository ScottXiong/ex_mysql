var express=require('express');
var app=express();
var mysql = require('mysql');
var host,user,pwd,database;
var dbinfo={
	host: `45.32.73.24`,
    user: `scottxiong`,
    password: `tanyun`,
    database:`scott`,
    port: 3306
}
//connect to db
exports.create_connection_to_db=function(){
	console.log("正在尝试连接数据库");
   return mysql.createConnection(dbinfo)
}
