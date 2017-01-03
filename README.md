# cinc（读数） 

Supported browsers：
* IE 11
* Edge  14⬆️
* Firefox 50⬆️
* Chrome 49⬆️
* Safari 10⬆️
* Wechat
* UC

Supported blog builder
* Jekyll
* Other tools you can modify the template

This plugin is aim to bring read counter for your static blog

There are two panels you can use

1. postPanel
  ```
  <div class="cinc-postPanel" 
     user-id="input user id"
     data-key="input post id" 
     data-title="input post title" 
     data-url="input post url"
     isReadOnly=true>
  </div>
  <script type="text/javascript" async="" 
  src="http://kelresource.oss-cn-shenzhen.aliyuncs.com/postPanel.min.js" 
  charset="UTF-8"></script>
  ```
  It will show the amount of reading the article
  You can use this panel inside the post list page or post detail page 

2. totalPanel
  ```
  <div class="cinc-totalPanel" 
     user-id="input user id" >
  </div>
  <script type="text/javascript" async="" 
  src="http://kelresource.oss-cn-shenzhen.aliyuncs.com/totalPanel.min.js" 
  charset="UTF-8"></script>
  ```
  It will show the amount of reading all articles in your blog
  You can use this panel inside the home page
  
  demo: ![](https://github.com/kelvv/cinc/blob/master/screenshot/demo.gif)
