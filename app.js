var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var add = require('./routes/add');
var remove = require('./routes/remove');
var update = require('./routes/update');
var find = require('./routes/find');
var find_one=require('./routes/find_one');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

app.use('/add', add);
app.use('/remove', remove);
app.use('/update', update);
app.use('/find', find);
app.use('/find/:id', find_one);
app.post('/add',function(req,res){
  var db=require('./routes/database/db')
  var table="regular_sentences"

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
    console.log("添加的数据为:",req.body)
    console.log("数据添加成功")
    res.render('index',{})
   })
    conn.end();  
}
)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
