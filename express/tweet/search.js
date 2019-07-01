


module.exports = function (query, fn) {
  request.get('http://jsonplaceholder.typicode.com/comments')
    .data({ postId: query})
    .end(function (res) {

    })
};
