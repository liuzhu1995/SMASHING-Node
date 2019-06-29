/**
 * @Description: 请求时间中间件.当请求响应时间超过设定阈值打印相关信息
 * @param {Object} option
 * @api public
 * 选项：
 *    -'time'('Number'):超时阈值(默认100)
*/

const defaultOption = {
  time: 100
};

module.exports = function (option = defaultOption) {
  const {time} = option;
  return function (req, res, next) {
    const timer = setTimeout(function() {
      console.log('%s %s is taking too long', req.method, req.url);

    }, time);

    //重写end方法，在响应结束时清除定时器
    const end = res.end;
    res.end = function (chunk, encoding) {
      res.end = end;
      res.end(chunk, encoding);
      clearTimeout(timer);
    };
    next();
  };
};
