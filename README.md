#Nodejs

##npm
npm是三位一体的系统,第三方包库、管理计算机中安装的包的机制、以及定义包依赖关系的标准。

###npm工作模式	
npm有两种工作模式：全局模式、本地模式
	
###npm包管理

####安装包

+ 全局安装:`npm install -g sax`
+ `npm install \<package name\>`
+ `npm install sax`
+ `npm install \<package name\>@\<version spec\>`
+ `npm install sax@0.2.5`
+ `npm install sax@0.2.x`
+ `npm install sax@"<0.3"`
+ `npm install sax@">=0.1.1 <0.3.1"`

####自动安装包

以下两个命令可以自动下载和安装确实的`package.json`中依赖模块

+ `pm install`
+ `npm update`
	
####卸载包

+ `npm uninstall \<package name\>`
+ `npm uninstall -g \<package name\>`
	
####更新包

+ `npm update \<package name\>`
+ `npm update -g \<package name\>`



####获取帮助
通过`npm help`命令可以获取帮助,如果需要获取更具体的某项帮助则需要更详细的命令,例如获取`install`命令的帮助用:`npm hlep install`.

	
###npm杂项

一个包可能有一个和多个可执行文件，全局安装的可执行文件放在`/user/local/bin`目录中.本地安装放在`./node_modules/.bin`目录中.npm维护了一个公共包库，可通过 <http://www.npmjs.org> 来查看,安装包同时也会安装其依赖的包

##加载模块

`Nodejs`模块有三种类型:`核心模块`,`第三方模块`(通过npm安装),`自定义模块`.模块返回的是一个对象,该对象可能是任意的Javascript值,可以是一个函数,也可以是一个具有若干属性的对象,属性可以是函数,数组或其他类型的`Javascript`对象.

###导出模块

在Node中,`CommonJs`模块系统是文件之间共享对象或函数的唯一方式,文件和模块是一一对应的.

```javascript

function Circle(x, y, r) {
    function r_squared() {
        return Math.pow(r, 2);

    }

    function area(argument) {
        return Math.PI * r_squared();
    }

    return {
        area: area
    };
}

module.exports = Circle;

```
将以上代码保存为`circle.js`文件,该文件导出`Circle`类的构造函数,这里的重点在最后一行,module是一个变量,它表示当前模块自身,而module.exports表示模块向需要它的脚本所导出的对象.当然也可以像下面这段代码一样分别导出对象的属性.

```javascript

function printA() {
    console.log('A');
}

function printB() {
    console.log('B');
}

function printC() {
    console.log('C');
}

module.exports.printA = printA;
module.exports.printB = printB;
module.exports.pi = Math.PI;


```
将上述代码保存为`print.js`文件,通过下面客户脚本引用。

```javascript

var print = require('./print'); //这里客户脚本文件和print.js文件在同一文件夹下
print.printA();
print.printB();
console.log(print.pi);


```

###加载模块

####加载核心模块

`Node`有一些以二进制形式发布的模块,这些模块被称为核心模块,直接通过模块名引用.

```javasript

var http = require('http');

```
####加载文件模块

文件模块可以通过绝对路径和相对路径引用.

```javascript

var myModule = require('/home/my_modules/my_module'); //绝对路径(根目录指的当前磁盘)
var myModule1 = require('./my_modules/myModule'); // 相对路径
var myModule1 = require('../my_modules/myModule'); // 相对路径

```
在这里文件模块的引用可以省略`.js`扩展名.

####加载文件夹模块

```javascript

var myModule = require('./myModuleDir');

```
Node会假设这个文件夹是一个包,并试图查找包定义,包定义在`package.json`,如果文件夹中不包含`package.json`,则入口点会假定为默认值为`index.js`;如果包含`package.json`,则会查找`package.json`中的'main'属性值作为入口点.

####从node_modules文件夹加载.

如果一个模块名既不是相对路径,也不是核心模块,那么Node就会尝试在当前目录下的`node_modules`文件夹中查找该模块,如果在当前目录下的`node_modules`下没找到,`Node`会继续往上查找,这个查找会持续到根目录(前提是没找到指定的模块).

####缓存模块

模块首次加载会被缓存起来,这意味着如果模块能被解析为相同的文件名,那么每次调用require都会确切的返回同一模块,而不会再去执行一次调用模块的代码.

##http模块

http模块用于构建`HTTP`服务器.HTTP是一个用来进行传输内容和引用程序的应用层协议,它将TCP用作传输协议,它也是万维网进行数据通信的基础.首选的应用程序部署方案之一就是在互联网上提供HTTP服务,来响应HTTP客户端的请求.

下面代码展示了http模块如何创建一个HTTP服务器。

```javascript

var http = require('http');
var server = http.createServer();
server.on('request',function(req,res){

	res.writeHead(200,{'Content-Type':'text/plain'});
	res.write('Hello World!');
	res.end();


});

server.listen(4000);

```

上面代码也可以简写成如下形式.

```javascript

require('http').createServer(function(req,res){

	res.writeHead(200,{'Content-Type':'text/plain'});
	res.end('Hello World!');

}).listen(4000);

```

###http.ServerRequest对象

在监听request事件时,回调函数会得到一个http.ServerRequest对象作为第一个参数，这个对象包含3个属性:`url`,`method`,`headers`.

+ `url`:该属性包含一个字符串形式的请求URL.它不包含模式、主机名、端口号，但包含除开上述以外的剩余部分.例如浏览器访问:'http://127.0.0.1:4000/abc',则`req.url`为'/abc'.
+ `method`:该属性包含在请求上用到的HTTP方法,可能值为:`GET`,`POST`,`DELETE`,`UPDATE`.
+ `req.headers`:该属性包含一个对象,这个对象拥有请求上所有的HTTP头.

```javascript

require('http').createServer(function(req,res){

	res.writeHead(200,{'Content-Type':'text/plain'});

	res.write(req.method);  //在浏览器中输出method属性
	console.log(req.headers);  //在控制台输出req.headers对象
	res.end(req.url); //在浏览器中输出url属性


}).listen(4000);

```

###http.ServerResponse对象

http.ServerResponse对象有以下方法

+ `writeHead()`: 写入响应头
+ `setHeader()`: 修改和设置响应头,只有在还没有用`res.write()`或者`res.end()`发送响应主体时才会起作用.设置了	`writeHead()`也不会起作用.
+ `removeHeader()`:删除响应头,只有在还没有用`res.write()`或者`res.end()`发送响应主体时才会起作用.设置了	`writeHead()`也不会起作用.
+ `write()`:写入一块响应主体

```javascript

res.write(200,{'Content-Type':'text/plain'});

res.setHeader(name,value);

res.removeHeader('Cache-Control');

res.write('Hello');

```

###举例

实例1：构建提交静态文件的服务器

```javascript

var path = require('path'),
    fs = require('fs');

require('http').createServer(function(req, res) {

    var file = path.normalize('.' + req.url);
    console.log('Try to serve', file);

    function reportError(err) {
        consle.log(err);
        res.writeHead(500);
        res.end('Interval Sever Error');

    }

    fs.exists(file, function(exists) {

        if (exists) {
            fs.stat(file, function(err, stat) {
                var rs;
                if (err) {
                    return reportError(err);
                }

                if (stat.isDirectory()) {
                    res.writeHead(403);
                    res.end('Forbidden');

                } else {
                    rs = fs.createReadStream(file);
                    rs.on('error', reportError);
                    res.writeHead(200);
                    rs.pipe(res);
                }


            });

        } else {
            res.writeHead(404);
            res.end('Not found');
        }

    });

}).listen(4000);


```

实例2:使用HTTP分块响应和定时器

```javascript

require('http').createServer(function(req,res){

	res.writeHead(200,{'Content-Type':'text/plain'});
	var left = 10;
	var interval = setInterval(function(){
		for (var i = 0; i <100; i++) {
			res.write(Date.now() + ' ');

		};

		if(--left == 0){
			clearInterval(interval);
			res.end();
		}
	}, 1000);

}).listen(4000);

```









