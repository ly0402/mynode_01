//引入数据库配置模块
var mongoose=require('../configs/db_config.js');

//2.定义user数据的骨架(来源01.js)
	//骨架的作用：约束authors集合
var authorSchema=new mongoose.Schema({
	itemId:{						//关联栏目
		type:'ObjectId',
		ref:'item',					//关联
	},
	name:String,					//作者名号
	// ctime:Date,					//加入时间
	ctime:{
		type:Date,
		default:new Date(),			//默认值
	},
	keywords:String,				//关键字(代表作)
	
	// order:Number,					//作者排序
	// description:String,				//作者描述	
	imgurl:String,					//美照
	content:String,					//内容
	//(注意是逗号)
})
// Schema({
//  author: ObjectId,
//  name: String,
//  body: String,
//  date: Date,
// });



//3.创建数据库的模型	(在数据库里创建集合的时候，会自动帮你变成复数)(来源01.js)
var authorModel= mongoose.model('author',authorSchema);

//暴露数据库模型
module.exports = authorModel;