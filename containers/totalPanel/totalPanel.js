'use strict'
function fetch (url, option) {
  return new Promise(function (resolve, reject) {
    let xmlhttp = {}
    if (window.XMLHttpRequest) {
      xmlhttp = new window.XMLHttpRequest()
    } else if (window.ActiveXObject) {
      xmlhttp = new window.ActiveXObject('Microsoft.XMLHTTP')
    }
    if (xmlhttp != null) {
      xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4) {
          if (xmlhttp.status === 200) {
            resolve(JSON.parse(xmlhttp.response))
          } else {
            reject('Problem retrieving XML data')
          }
        }
      }
      xmlhttp.open(option.method, url, true)
      if (option.headers !== undefined) {
        for (let key in option.headers) {
          xmlhttp.setRequestHeader(key, option.headers[key])
        }
      }
      xmlhttp.send(option.body)
    } else {
      reject('Your browser does not support XMLHTTP.')
    }
  })
}
window.onload = function () {
  let panels = document.getElementsByClassName('cinc-totalPanel')
  let url = 'http://cinc.leanapp.cn/1.1/functions/totalCount'
  for (let i = 0; i < panels.length; i++) {
    let panel = panels[i]
    let atts = ['user-id']
    atts.forEach(att => {
      if (!Object.prototype.hasOwnProperty.call(panel.attributes, att)) {
        throw Error(`缺少 ${att} 属性`)
      }
    })
    let body = `userId=${panel.attributes['user-id'].nodeValue}&&domain=${document.domain}`
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-AVOSCloud-Application-Id': 'GfIwMv2BxjSrE7IWjUDDjuLY-gzGzoHsz',
        'X-AVOSCloud-Application-Key': '2Yxh385fxLsI1LqyxwFnJjWa'
      },
      body
    }).then(function (res) {
      let postCount = document.createElement('p')
      postCount.textContent = `博文: ${res.result.postCount}篇`
      panel.appendChild(postCount)
      let readCount = document.createElement('p')
      readCount.textContent = `阅读: ${res.result.readCount}次`
      panel.appendChild(readCount)
    }, function (e) {

    })
  }
}

