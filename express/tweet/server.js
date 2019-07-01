//引入依赖
const express = require('express'),
      ejs = require('ejs'),
      path = require('path');
      search = require('./search');


const app = express();

//配置
app.set('views', path.join(__dirname, 'views'));

//Express默认使用jade模板,要使用其他模板引擎，如:将EJS模板映射至".html"文件
app.engine('html', ejs.__express);
app.set('view engine', 'html');


//路由
app.get('/', function (req, res) {
  console.log(0);
  res.render('index', ({ title: 'Twitter app.' }));
});

app.get('/search', function (req, res, next) {
  console.log(req.query, 1);
  search(req.query.postId, function (err, tween) {
    if(err) {
      return next(err);
    }
    res.render('search', { results: tween, search: req.query.postId });
  });
});


//监听
app.listen(3000);
