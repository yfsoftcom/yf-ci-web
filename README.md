## YF-CI-WEB
> 这是一个可以通过web界面来执行linux shell 的工具

### 0.Overview
自己平时喜欢捣腾玩意儿，弄了个centos主机，学习shell，做了一些脚本，但是执行都要xshell进，好麻烦！
于是就有了这个小工具，安装在linux上，可以通过web来执行shell指令了。在家也可以编译发布产品代码，开森~
实际上就是一个nodejs的小应用，通过child_process来执行shell指令。
凑活着用呗，嘿嘿~
配合上自己写的一些shell脚本蛮实用的

奉上源码地址：[https://github.com/yfsoftcom/yf-ci-web](https://github.com/yfsoftcom/yf-ci-web)
欢迎拍砖

* PC上界面如下:
![执行 free -m 命令](http://upload-images.jianshu.io/upload_images/1449977-8a6e701bba8ec1da.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

* 兼容适配手机哦，不过手机上能显示的空间小，费眼~
![iphone 6 打开 执行 free -m 命令](http://upload-images.jianshu.io/upload_images/1449977-a2784585654a6734.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 1. Install
```
$ git clone https://github.com/yfsoftcom/yf-ci-web.git

$ cd yf-ci-web

$ npm install
```

### 2. Run
```
$ npm start
//或者使用pm2来启动
$ pm2 start index.js -i 1 --name yf-ci-web
```
### 3. Useage
打开 [http://[yourdomain]:8002](http://localhost:8002)

### 4. Known Issues
* windows 上无法执行cmd 的指令
* 一些危险的linux指令没有屏蔽
