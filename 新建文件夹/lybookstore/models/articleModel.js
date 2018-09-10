//引入数据库配置模块
var mongoose=require('../configs/db_config.js');

//2.定义user数据的骨架(来源01.js)
	//骨架的作用：约束articles集合
var articleSchema=new mongoose.Schema({
	itemId:{						//关联栏目
		type:'ObjectId',
		ref:'item',					//关联
	},
	title:String,					//作品标题
	author:String,					//作者
	// ctime:Date,					//发布时间
	ctime:{
		type:Date,
		default:new Date(),			//默认值
	},
	keywords:String,				//关键字
	
	order:Number,					//作品排序
	description:String,				//作品描述	
	imgurl:String,					//封面
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
var articleModel= mongoose.model('article',articleSchema);

//暴露数据库模型
module.exports = articleModel;