var logger = require('koa-logger');
var route = require('koa-route');
var parse = require('co-body');
var koa = require('koa');

var views = require('co-views');
var render = views(__dirname + '/views', {
  map: { html: 'swig' }
});

var spawn = require('child_process').spawn;

var os = process.platform;

var app = koa();

app.use(logger());
app.use(route.get('/', index));
app.use(route.post('/execute',execute));

// app.use(route.post('/', index));

function *index() {
  this.body = yield render('index');
}

function *runCommand(command){
  // 捕获标准输出并将其打印到控制台
  return command.stdout.on('data', function (data) {
      console.log('标准输出：\n' + data);
      return 2;
  });

  // 捕获标准错误输出并将其打印到控制台
  return command.stderr.on('data', function (data) {
      console.log('标准错误输出：\n' + data);
      return 3;
  });

  // 注册子进程关闭事件
  return command.on('exit', function (code, signal) {
      console.log('子进程已退出，代码：' + code);
      return 1;
  });
  //this.body = {status:0};
}

function *execute() {
  var args = yield parse(this);
  console.log('execute：' + args.command);
  var commandText = args.command;
  var arr = commandText.split(' ');
  var c = arr[0];
  arr.splice(0,1);
  console.log(c);
  console.log(arr);
  var command = {};

  try{
    if(os === 'win32'){
      command = spawn('cmd.exe',['\s', '\c',c,'D:']);
    }else{
      command = spawn(c,arr);
    }
    this.body = yield runCommand(command);
  }catch(e){
    this.body = e;
  }
}

process.on('uncaughtException',function (req, res, route, e) {
  console.log(e);
});

app.listen(3000);
