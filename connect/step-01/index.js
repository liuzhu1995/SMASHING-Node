//引入模块
const http = require('http'),
      fs = require('fs');



/*
 //创建服务器
 const server =  http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});

  if('GET' === req.method &&
    '/images' === req.url.substr(0, 7) &&
    '.jpg' === req.url.substr(-4)
  ) {
    //读取jpg图片
    fs.stat(__dirname + req.url, function(err, stat) {
      if(err || !stat.isFile()) {
        //如果出错或者是文件  返回404
        res.writeHead(404);
        res.end('Not Found');
        return;
      }
      res.writeHead(200, {'Content-Type': 'application/jpg'});
      const stream = fs.createReadStream(__dirname + req.url);
      stream.on('data', function(data) {
        res.write(data);
      });
      stream.on('end', function () {
        res.end();
      });
    });
  }else if('/' === req.url) {
    //读取写入html文件
    res.writeHead(200, {'Content-Type': 'text/html'});
    const stream = fs.createReadStream(__dirname + '/index.html');
    stream.on('data', function(data) {
      res.write(data);
    });
    stream.on('end', function () {
      res.end();
    })
  }else {
    res.writeHead(404);
    res.end('Not Found');
  }
});
server.listen(3000);

*/

//创建服务器

const server = http.createServer(function (req, res) {
  if('GET' === req.method &&
    '/images' === req.url.substr(0, 7) &&
    '.jpg' === req.url.substr(-4)) {
    fs.stat(__dirname + req.url, function(err, stat) {
      if(err || !stat.isFile()) {
        res.writeHead(404);
        res.end('Not Found');
        return;
      }
      serve(__dirname + req.url, 'application/jpg');
    })
  }else if('/' === req.url) {
    serve(__dirname + '/index.html', 'text/html');
  }else {
    res.writeHead(404);
    res.end('Not Found');
  }

  function serve(path, type) {
    res.writeHead(200, {'Content-Type': type});
    fs.createReadStream(path).pipe(res);
  }

});


server.listen(3000);
