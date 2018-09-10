//图片上传配置文件
var express = require('express');
var router = express.Router();

//引入multer 模块
var multer=require('multer');

//引入路径模块 系统模块 不用下载
var path=require('path');//可以直接返回文件名和扩展名

// 引入格式化时间模块
var timestamp=require('time-stamp');

//引入uid模块(生成唯一的随机数(字符串))
var uid=require('uid');

/*
备注：
	函数名称：imgUpload
	功能：图片上传
	参数：	imgPath(String)--接收图片时保存的路径
			imgType(Array)--允许用户上传的图片类型--例['image/jpeg','image/png','image/gif']
			fileSize(Number)--限制文件的大小(单位：字节)
	返回值：upload 对象
	作者：simon
	版本：1.0.0
	日期：2018-06-19
*/
function imgUpload(imgPath,imgType,fileSize){
	//基本配置  文件上传的基本的配置 后来不足以满足
	// var upload=multer({dest:'uploads/'});

	//基本配置  文件上传的基本的配置
	var storage=multer.diskStorage({
		//
		destination:function(req,file,cb){
			//接受图片的文件夹
			cb(null,imgPath)
		},
		//设置接收后的文件名称
		filename:function(req,file,cb){
			console.dir(file);
			//返回路径的扩展名
			var extName=path.extname(file.originalname);
			//配置文件名
			// cb(null,file.fieldname+'-'+Date.now()+extName)
			cb(null,timestamp()+'-'+uid()+'-'+extName)
		}
	})

	//过滤函数的配置
	function fileFilter(req,file,cb){
		
		/* 需求：只允许用户上传：jpeg,png,gif */
		/* 思路：file--类型  允许： cb(null,true)  
		不允许：cb(null,false)*/


		// //这个函数应该调用 'cb' 用Boolean值来
		// //指示是否应该接受该文件

		// //拒绝这个文件，使用'false',像这样：
		// cb(null,false)

		// //接受这个文件，使用'true',像这样：
		// cb(null,true)

		// //如果有问题，你可以总是这样发送一个错误：
		// cb(new Error('I don\'t have a clue!'))

	/*
		Key	Description
		dest or storage		在哪里存储文件
		fileFilter			文件过滤器，控制哪些文件可以被接受
		limits				限制上传的数据
		preservePath		保存包含文件名的完整文件路径
	*/

		// console.log(file);
		//提交文件后，标题一直旋转，无回应

		//声明一个数组
		//判断上传的文件类型是否为定义的
		if(imgType.indexOf(file.mimetype)==-1){
			//拒绝这个文件，使用'false',像这样：
			cb(null,false)
			//如果有问题，你可以总是这样发送一个错误：
			cb(new Error('只允许用户上传：jpeg,png,gif 样式的图片'))
		}else{
			//接受这个文件，使用'true',像这样：
			cb(null,true)
		}
	}

	//设置文件上传配置
	var upload=multer({
		//基本配置
		storage:storage,
		//文件过滤函数
		fileFilter:fileFilter,
		//限制文件大小
		limits:{
			//单位：字节
			fileSize:fileSize,//(5M)

		/*
			1024			字节(b)
			9.0949e-13		拍字节(pb)
			0.0009766		兆字节(mb)
			1				千字节(kb)
			8.8818e-16		艾字节(eb)
			8192			比特(bit)
			9.5367e-7		千兆字节(gb)
			9.3132e-10		太字节(tb)

		*/
		}
	})

	//返回值
	return upload;
}

//暴露图片上传函数
module.exports = imgUpload;