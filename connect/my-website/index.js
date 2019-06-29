//模块依赖
const connect = require('connect'),
      serveStatic = require('serve-static');

//创建服务器
const server = connect();


//处理静态文件
server.use(serveStatic(__dirname + '/website'));

server.listen(3001);
