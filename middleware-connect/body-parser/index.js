//引入依赖
const connect = require('connect'),
      fs = require('fs'),
      serveStatic = require('serve-static'),
      multiparty = require('multiparty');


//创建服务器
const server = connect();

server.use(serveStatic('static'));


server.use(function (req, res, next) {
  if('POST' === req.method && '/' === req.url) {
    var form= new multiparty.Form({
      uploadDir: 'static'
    });
    form.parse(req);
    form.on('field', function (name, value) {
      console.log(name, value, 1)
    });
    form.on('file', function (name, file, ...rest) {
      console.log(name, file, 2);
    });
    form.on('close', function () {
      console.log('表单解析完成');
    })

  }else {
    next();
  }
});

server.listen(3000);
