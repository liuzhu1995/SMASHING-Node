//引入依赖
const connect = require('connect'),
      logger = require('morgan'),
      time = require('./request-time');

//创建服务器
const server = connect();

//记录请求情况
server.use(logger('dev'));

//实现时间中间件
server.use(time());

//快速响应
server.use(function (req, res, next) {
  if('/fast' === req.url) {
    res.writeHead(200);
    res.end('Fast');
  }else {
    next();
  }
});

//慢速响应
server.use(function (req, res, next) {
  if('/slow' === req.url) {
    setTimeout(function () {
      res.writeHead(200);
      res.end('Slow');
    }, 100)
  }else {
    next();
  }
});


//监听
server.listen(3000);

