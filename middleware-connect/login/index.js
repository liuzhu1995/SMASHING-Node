//引入依赖
const connect = require('connect'),
      logger = require('morgan'),
      cookieParser = require('cookie-parser'),
      session = require('express-session'),
      bodyParser = require('body-parser'),
      users = require('./users');

//创建服务器
const server = connect();

/*实现中间件*/

server.use(logger('dev'));
server.use(cookieParser());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(session({secret: 'my app secret'}));

server.use((req, res, next) => {
  console.log(req.session, 'session');
  if('/' === req.url && req.session.logged_in) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(`
      Welcome back,<b>${req.session.name}</b>.
      <a href="/logout">Logout</a> 
    `);
  }else {
    next();
  }
});

//表单
server.use((req, res, next) => {
  if('/' === req.url && 'GET' === req.method) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(`
      <form action="/login" method="POST">
        <fieldset>
          <legend>Please log in</legend>
          <p>User: <input type="text" name="user"/></p>
          <p>Password: <input type="password" name="password"/></p>
          <button>Submit</button>
        </fieldset>
      </form>
    `)
  }else {
    next();
  }
});

//登陆
server.use((req, res, next) => {
  if('/login' === req.url && 'POST' === req.method) {
    res.writeHead(200);
    const {user, password} = req.body;
    if(!user || password !== users[user].password) {
      res.end('Bad username/password');
    }else {
      req.session.logged_in = true;
      req.session.name = users[user].name;
      console.log(req.session, 77);
      res.end('Authenticated')
    }
  }else {
    next();
  }
});

//登出
server.use((req, res, next) => {
  if('/logout' === req.url) {
    req.session.logged_in = false;
    res.writeHead(200);
    res.end('Logged out!')
  }else {
    next();
  }
});


//监听
server.listen(3001);



