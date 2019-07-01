
const request = require('superagent');

module.exports = function (query, fn) {
  request.get('http://jsonplaceholder.typicode.com/comments')
    .query({ postId: query})
    .end(function (err, res) {
      console.log(res.body, 'SEARCH');
      if(res.body && Array.isArray(res.body)) {
        return fn(null, res.body);
      }
      fn(new Error('Bad twitter response'));
    });
};
