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
app.use(route.post('/github',github));

// app.use(route.post('/', index));

function *index() {
  this.body = yield render('index');
}

function *runCommand(command){
  // 捕获标准输出并将其打印到控制台
  return command.stdout.on('data', function (data) {
      console.log('标准输出：\n' + data);
      return data;
  });

  // 捕获标准错误输出并将其打印到控制台
  return command.stderr.on('data', function (data) {
      console.log('标准错误输出：\n' + data);
      return data;
  });

  // 注册子进程关闭事件
  return command.on('exit', function (code, signal) {
      console.log('子进程已退出，代码：' + code);
      return code;
  });
  //this.body = {status:0};
}

function *github(ctx) {
  var args = yield parse(this);

  var payload = JSON.parse(eval(args.payload));
  var ref = payload.ref;
  var repository_name = payload.repository.name;
  console.log(ref + ";" + repository_name);
  this.body = 'success';
}

function *execute() {
  var args = yield parse(this);
  console.log(args);

  console.log('execute：' + args.command);
  var commandText = args.command;
  var arr = commandText.split(' ');
  var c = arr[0];
  arr.splice(0,1);
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
  console.log(req);
  console.log(res);
  console.log(route);
  console.log(e);
});

app.listen(8002);
