const AV = require('leanengine')
const co = require('co')

function preprocess (req) {
  return new Promise((resolve, reject) => {
    co(function* () {
      let domain = req.params.domain || ''
      var query = new AV.Query('_User')
      query.equalTo('objectId', req.params.userId)
      query.equalTo('domain', domain)
      let user = yield query.find()
      if (user.length > 0) {
        resolve({
          result: true
        })
      } else {
        resolve({
          result: false,
          error: '用户不存在者域名错误'
        })
      }
    })
  })
}

AV.Cloud.define('signUp', function (req, res) {
  co(function* () {
    let user = new AV.User()
    user.setUsername(req.params.username)
    user.setPassword(req.params.password)
    user.set('domain', req.params.domain)
    user.signUp().then(function (loginedUser) {
      res.success(`signin success! Id:${loginedUser.id}`)
    }, function (error) {
      res.error(JSON.stringify(error))
    })
  })
})

AV.Cloud.define('incPostRead', function (req, res) {
  co(function* () {
    let preResult = yield preprocess(req)
    if (!preResult.result) {
      res.error(preResult.error)
      return
    }
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
      post.set('postUrl', req.params.postUrl)
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
  co(function* () {
    let preResult = yield preprocess(req)
    if (!preResult.result) {
      res.error(preResult.error)
      return
    }
    var query = new AV.Query('posts')
    query.equalTo('postId', req.params.postId)
    let posts = yield query.find()
    if (posts.length > 0) {
      res.success(posts[0].get('readCount'))
    } else {
      let user = AV.Object.createWithoutData('_User', req.params.userId)
      let Post = AV.Object.extend('posts')
      let post = new Post()
      post.set('postId', req.params.postId)
      post.set('author', user)
      post.set('postTitle', req.params.postTitle)
      post.set('postUrl', req.params.postUrl)
      yield post.save()
      res.success(0)
    }
  })
})

AV.Cloud.define('totalCount', function (req, res) {
  co(function* () {
    let preResult = yield preprocess(req)
    if (!preResult.result) {
      res.error(preResult.error)
      return
    }
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
