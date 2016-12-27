'use strict'
var panels = document.getElementsByClassName('cinc-postPanel')
for (let panel of panels) {
  var body = `userId=${panel.attributes['user-id'].nodeValue}&&postId=${panel.attributes['data-key'].nodeValue}&&postTitle=${panel.attributes['data-title'].nodeValue}`

  var url = 'http://cinc.leanapp.cn/1.1/functions/'
  if (panel.attributes['isReadOnly'].nodeValue === 'true') {
    url += 'getPostRead'
  } else {
    url += 'incPostRead'
  }
  window.fetch(url, {
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
      a.textContent = `阅读 ${obj.result || 0}`
      panel.appendChild(a)
    })
  }, function (e) {

  })
  console.log(panel.attributes['user-id'].nodeValue)
}

