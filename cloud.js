const AV = require('leanengine')
const co = require('co')

AV.Cloud.define('signUp', function (req, res) {
  let user = new AV.User()
  user.setUsername(req.params.username)
  user.setPassword(req.params.password)
  user.signUp().then(function (loginedUser) {
    res.success(`signin success! Id:${loginedUser.id}`)
  }, function (error) {
    res.error(JSON.stringify(error))
    console.log(JSON.stringify(error))
  })
  console.log(req)
})

AV.Cloud.define('incPostRead', function (req, res) {
  co(function* () {
    let user = AV.Object.createWithoutData('_User', req.params.userId)
    var query = new AV.Query('posts')
    query.equalTo('postId', req.params.postId)
    query.equalTo('author', user)
    query.equalTo('postTitle', req.params.postTitle)
    let posts = yield query.find()
    let post = posts.pop()
    if (post === undefined) {
      let Post = AV.Object.extend('posts')
      post = new Post()
      post.set('postId', req.params.postId)
      post.set('author', user)
      post.set('postTitle', req.params.postTitle)
      post = yield post.save()
    }
    post.increment('readCount', 1)
    post.save({
      fetchWhenSave: true
    }).then((todo) => {
      res.success(post.get('readCount'))
    }, (error) => {
      res.error(JSON.stringify(error))
      console.log(JSON.stringify(error))
    })
  })
})

AV.Cloud.define('getPostRead', function (req, res) {
  console.log('getPostRead call')
  co(function* () {
    var query = new AV.Query('posts')
    query.equalTo('postId', req.params.postId)
    let posts = yield query.find()
    if (posts.length > 0) {
      res.success(posts[0].get('readCount'))
    } else {
      res.success(0)
    }
  })
})

AV.Cloud.define('totalCount', function (req, res) {
  co(function* () {
    let user = AV.Object.createWithoutData('_User', req.params.userId)
    var query = new AV.Query('posts')
    query.equalTo('author', user)
    let posts = yield query.find()
    let readCount = 0
    posts.forEach((post) => {
      readCount += post.get('readCount')
    })

    res.success({
      readCount,
      postCount: posts.length
    })
  }).then(() => {

  }, (error) => {
    res.error(JSON.stringify(error))
  })
})

module.exports = AV.Cloud
