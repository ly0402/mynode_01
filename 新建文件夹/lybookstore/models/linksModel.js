//引入数据库配置模块
var mongoose=require('../configs/db_config.js');

//2.定义user数据的骨架(来源01.js)
	//骨架的作用：约束linkss集合
var linksSchema=new mongoose.Schema({

	title:String,					//链接标题
	url:String,						//链接地址
	// ctime:Date,					//发布时间
	ctime:{
		type:Date,
		default:new Date(),			//默认值
	},
	keywords:String,				//关键字
	
	order:Number,					//链接排序
	description:String,				//链接描述	
	content:String,					//内容
	//(注意是逗号)
})
// Schema({
//  author: ObjectId,
//  title: String,
//  body: String,
//  date: Date,
// });



//3.创建数据库的模型	(在数据库里创建集合的时候，会自动帮你变成复数)(来源01.js)
var linksModel= mongoose.model('links',linksSchema);

//暴露数据库模型
module.exports = linksModel;