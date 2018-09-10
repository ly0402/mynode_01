//引入数据库配置模块
var mongoose=require('../configs/db_config.js');

//2.定义user数据的骨架(来源01.js)
	//骨架的作用：约束items集合
var itemSchema=new mongoose.Schema({
	name:String,		//栏目标题
	// ctime:Date,		//创建时间
	ctime:{
		type:Date,
		default:new Date(),			//默认值
	},
	// order:{
	// 	type:Number,	//排序
	// 	default:999,	//默认值
	// },
	order:Number,		//栏目排序
	description:String,	//栏目描述	
	//(注意是逗号)
})
// Schema({
//  author: ObjectId,
//  title: String,
//  body: String,
//  date: Date
// });



//3.创建数据库的模型	(在数据库里创建集合的时候，会自动帮你变成复数)(来源01.js)
var itemModel= mongoose.model('item',itemSchema);

//暴露数据库模型
module.exports = itemModel;