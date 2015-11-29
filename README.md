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



