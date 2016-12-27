(function () {
  var div = document.getElementsByClassName('cinc-totalPanel')[0]
  var body = `userId=${div.attributes['user-id'].nodeValue}`
  window.fetch('http://cinc.leanapp.cn/1.1/functions/totalCount', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-AVOSCloud-Application-Id': 'GfIwMv2BxjSrE7IWjUDDjuLY-gzGzoHsz',
      'X-AVOSCloud-Application-Key': '2Yxh385fxLsI1LqyxwFnJjWa'
    },
    body
  }).then(function (res) {
    res.json().then((obj) => {
      var a = document.createElement('a')
      a.style = 'color: #555; text-decoration: none; outline: none; font-size: 12px'
      a.textContent = `文章数量 ${obj.result.postCount} * 总阅读量 ${obj.result.readCount}`
      div.appendChild(a)
    })
  }, function (e) {

  })
  console.log(div.attributes['user-id'].nodeValue)
})()
