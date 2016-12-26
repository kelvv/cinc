var div = document.getElementsByClassName('cinc-postPanel')[0]
var a = document.createElement('a')
a.style = 'color: #555; text-decoration: none; outline: none; font-size: 14'
a.textContent = '阅读 12'
div.appendChild(a)
window.fetch('http://www.example.org/submit.php', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: 'firstName=Nikhil&favColor=blue&password=easytoguess'
}).then(function (res) {
  if (res.ok) {
    alert('Perfect! Your settings are saved.')
  } else if (res.status == 401) {
    alert('Oops! You are not authorized.')
  }
}, function (e) {
  alert('Error submitting form!')
})
window.fetch('http://blog.parryqiu.com').then(function (response) { console.log(response) })
console.log(div.attributes['user-id'].nodeValue)
