//数据库的配置文件

//引入模块(https://www.npmjs.com/package/mongoose)(来源01.js)
// const mongoose = require('mongoose');
var mongoose=require('mongoose');

//1.连接数据库 
mongoose.connect('mongodb://localhost:27017/lybookstore',function(err){
	//测试数据库是否连接成功
	if(err){
		console.log('数据库连接失败');
	}else{
		console.log('数据库连接成功');
	}
	//在cmd-app中
	// $node 01.js
});

//暴露mongoDB模块
module.exports = mongoose;