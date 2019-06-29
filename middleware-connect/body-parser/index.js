//引入依赖
const connect = require('connect'),
      serveStatic = require('serve-static'),
      multiparty = require('multiparty');


//创建服务器
const server = connect();

server.use(serveStatic('static'));


server.use(function (req, res, next) {
  if('POST' === req.method && '/' === req.url) {
    const form= new multiparty.Form({
      uploadDir: 'static'
    });
    form.parse(req, function(err,fields,files){
      console.log(fields, files);
    });

  }else {
    next();
  }
});

server.listen(3000);
