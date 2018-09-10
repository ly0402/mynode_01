// 后台的控制器
var adminController={};

//引入数据库模型、模块
var itemModel=require('../models/itemModel.js')
var articleModel=require('../models/articleModel.js')
var authorModel=require('../models/authorModel.js')
var linksModel=require('../models/linksModel.js')


// 首页
adminController.Index=function(req,res){
	
	// 判断用户 有没有登录
    if (!req.session.user) res.redirect('/admin/login');
	
	//响应模版
	res.render('admin/index');
}



/*栏目*/
//添加栏目
adminController.itemAdd=function(req,res){
	//响应模版
	res.render('admin/itemAdd');
}

//插入栏目数据
adminController.itemInsert=function(req,res){

	//插入数据到数据库

	//查看是否存在数据
	// res.send(req.body);

	itemModel.create(req.body,function(err){
		if(err){
			console.log('数据库添加数据失败')
		}else{
			// res.send('数据库添加数据成功');//如有数据列表，可直接跳转
			
			//在控制器内跳转到响应页面
			res.redirect('../admin/itemList');
		}
	})
}

//栏目列表
adminController.itemList=function(req,res){

	//测试路由是否有问题
	// res.send('测试路由没有问题');


	//获取栏目列表

	//初始
	// itemModel.find(function(err,data){
	//为了排序
    itemModel.find().sort({order:1}).exec(function(err,data){
		if(err){
			console.log('数据库添加数据失败')
		}else{
			//查看data数据的结构
			// console.log(data);

			// res.send('测试路由没有问题');
			// res.send(data);//如有数据列表，可直接跳转

			//响应模版，并分配数据
			res.render('admin/itemList',{datalist:data});
		}
	})
}

//编辑栏目列表页面
adminController.itemEdit=function(req,res){

	//查询要编辑的数据
	itemModel.find({_id:req.params._id},function(err,data){
		if(err){
			console.log('数据库查询数据失败')
		}else{
			//响应模版，并分配数据
			res.render('admin/itemEdit',{data:data[0]});
		}
	})
}

//编辑栏目数据
adminController.itemUpdate=function(req,res){
	// 需要知道id (itemEdit)

	//更新数据
	itemModel.update({_id:req.body._id},req.body,function(error){
		//跳转到栏目列表
		res.redirect('/admin/itemList');
	})
}

// //删除栏目数据
// adminController.itemRemove=function(req,res){

// 	// 流程是否走通

// 	res.send('ok');
// 	// req.params._id
// 	// 删除数据

// 	itemModel.remove({_id:req.params._id},function(error){
// 		//跳转到栏目列表
// 		res.redirect('/admin/itemList');

// 	})
// }

// 删除栏目数据
adminController.itemRemove = function (req,res) {
    // 数据库删除的操作 
    itemModel.remove({ _id: req.params._id},function (error) {
        if (error) {
        	//直接返回错误信息
            res.send(error)
        } else {
            // 跳转到栏目列表
            res.redirect('/admin/itemList');
        }
    })
}



/*作品*/
//发布作品页面
adminController.articleAdd=function(req,res){
	// 获取栏目列表
    itemModel.find().sort({ order: 1 }).exec(function (err, data) {
        if (err) {
            console.log('数据添加数据失败');
        } else {
            // 响应模版
            res.render('admin/articleAdd',{ itemlist: data });
        }
    })
} 

adminController.articleInsert=function(req,res){
	//req.body 文本数据

	//multer 模块来处理 文件接收

	//引入图片上传配置
	var imgUpload=require('../configs/imgUpload_config.js');

	//文件上传的路径
	var imgPath='imgUploads';

	//允许用户上传的图片类型
	var imgArr=['image/jpeg','image/png','image/gif'];

	//定义文件大小
	var fileSize=1024*1024*5;

	//图片上传
	var upload = imgUpload(imgPath,imgArr,fileSize).single('imgurl')

	// app.post('/profile', function (req, res) {
	  upload(req, res, function (err) {
	  	//判断能否上传成功
	    if (err) {
	      	// 发生错误
	      	// return
	      	res.send('图片上传失败');
	    }else{
	    	// 一切都好
	     	// res.send('图片上传成功');

	      	//获取文本信息
	      	// console.log(req.body);

	      	//获取图片信息
	      	//在 req.file 里

	      	// console.log(req.file);

	      	// 把用户上传的图片路径写到 req.body 里
            req.body.imgurl = req.file.filename;

	      	//把作品信息存到数据库
	      	articleModel.create(req.body,function(err){
				if(err){
					console.log('数据库添加数据失败')
				}else{
					// res.send('数据库添加数据成功');//如有数据列表，可直接跳转
					
					//在控制器内跳转到响应页面
					res.redirect('../admin/articleList');
					// res.send('数据库添加数据成功');

				}
			})
	    }

	})
	// })
}

/*
// 插入作品数据
adminController.articleInsert=function(req,res){

	//插入数据到数据库

	//查看是否存在数据
	// res.send(req.body);

	articleModel.create(req.body,function(err){
		if(err){
			console.log('数据库添加数据失败')
		}else{
			// res.send('数据库添加数据成功');//如有数据列表，可直接跳转
			
			//在控制器内跳转到响应页面
			res.redirect('../admin/articleList');
		}
	})
}
*/


// 作品列表
// adminController.articleList = function (req,res) {

//     //测试
//     // res.send('文章列表');

//     //每页显示多少条数据
//     var pageSize=6;

//     //当前页
//     var page=2;

//     // 一共有多少条数据
//     articleModel.find().count(function(errr,total){

//         //最大页码
//         var maxPage=Math.ceil(total/pageSize);

//         //偏移量(就哪条数据开始查)
//         var offset=pageSize*(page-1);

//         // res.send('文章列表');      // populate 去查关联的集合
//         articleModel.find().limit(pageSize).skip(offset).populate('itemId',{name:1}).exec(function (err,data) {
//             if (err) {
//                 console.log('数据添加失败');
//              } else {
        
//                 // res.send(data);

//                 // 响应模版
//                 res.render('admin/articleList', { articlelist: data});

//             }
//         })

//         console.log(total);
//     })   
// }

// 作品列表
adminController.articleList = function (req,res) {

    // 每页显示多少条数据
    var pageSize = 6;

    // 当前页
    var page = req.query.page ? req.query.page:1;

    // 一共有多少条数据
    articleModel.find().count(function (errr,total) {
        // 最大页码
        var maxPage = Math.ceil(total/pageSize);

        // 判断上一页和下一页边界
        if (page < 1) page = 1;
        if (page > maxPage) page = maxPage;

        // 偏移量（就哪条数据开始查）
        var offset = pageSize*(page-1)
        // res.send('作品列表');  // populate 去查关联的集合
        articleModel.find().limit(pageSize).skip(offset).populate('itemId',{name:1}).exec(function (err, data) {
            if (err) {
                console.log('数据添加数据失败');
            } else {
                // 响应模版 发送数据
                res.render('admin/articleList', { articlelist: data, maxPage: maxPage, page: Number(page)});
            }
        })
    })
}


// 删除作品
adminController.articleRemove = function(req,res){
    // 数据库删除的操作 
    articleModel.remove({ _id: req.params._id }, function (error) {
        if (error) {
            res.send(error)
        } else {
            // 跳转到作品列表
            res.redirect('/admin/articleList');
        }
    })
}

// 编辑作品的页面
adminController.articleEdit = function (req,res) {
    // 查询需要编辑的数据
    articleModel.find({ _id: req.params._id }, function (err, data) {
        if (err) {
            res.send('查询数据失败')
        } else {            
            // 获取栏目列表
            itemModel.find().sort({ order: 1 }).exec(function (err, itemdata) {
                if (err) {
                    console.log('数据添加数据失败');
                } else {
                    // 响应模版 分配数据
                    res.render('admin/articleEdit', { data: data[0], itemlist: itemdata });
                }
            })
        }
    })
}

// 修改作品文本
adminController.articleUpdate = function(req,res){
    // 更新数据
    articleModel.update({ _id: req.body._id }, { $set: req.body } , function (error) {
        // 跳转到栏目列表
        res.redirect('/admin/articleList');
    })
}

// 修改作品的图片
adminController.articleUpdateImage = function (req,res) {
   
    // 引入图片上传配置
    var imgUpload = require('../configs/imgUpload_config.js');
    // 文件上传的路径
    var imgPath = 'imgUploads'
    // 允许用户上传的图片
    var imgArr = ['image/jpeg', 'image/png', 'image/gif'];
    // 定义文件大小
    var fileSize = 1024 * 1024 * 4;

    // 图片上传
    var upload = imgUpload(imgPath, imgArr, fileSize).single('imgurl');
    upload(req, res, function (err) {
        if (err) {
            res.send('图片上传失败');
        } else {
            // 修改指定作品的封面
            articleModel.update({ _id: req.body._id }, { $set: { imgurl: req.file.filename} }, function (error) {
                if (error) {
                    console.log('数据添加数据失败');
                } else {
                    // 跳转到首页
                    res.redirect('/admin/articleList');
                }
            })
        }
    })   
}




/*作者*/
//发布作者页面
adminController.authorAdd=function(req,res){
	// 获取栏目列表
    itemModel.find().sort({ order: 1 }).exec(function (err, data) {
        if (err) {
            console.log('数据添加数据失败');
        } else {
            // 响应模版
            res.render('admin/authorAdd',{ itemlist: data });
        }
    })
} 

adminController.authorInsert=function(req,res){
	//req.body 文本数据

	//multer 模块来处理 文件接收

	//引入图片上传配置
	var imgUpload=require('../configs/imgUpload_config.js');

	//文件上传的路径
	var imgPath='imgUploads';

	//允许用户上传的图片类型
	var imgArr=['image/jpeg','image/png','image/gif'];

	//定义文件大小
	var fileSize=1024*1024*5;

	//图片上传
	var upload = imgUpload(imgPath,imgArr,fileSize).single('imgurl')

	// app.post('/profile', function (req, res) {
	  upload(req, res, function (err) {
	  	//判断能否上传成功
	    if (err) {
	      	// 发生错误
	      	// return
	      	res.send('图片上传失败');
	    }else{
	    	// 一切都好
	     	// res.send('图片上传成功');

	      	//获取文本信息
	      	// console.log(req.body);

	      	//获取图片信息
	      	//在 req.file 里

	      	// console.log(req.file);

	      	// 把用户上传的图片路径写到 req.body 里
            req.body.imgurl = req.file.filename;

	      	//把作者信息存到数据库
	      	authorModel.create(req.body,function(err){
				if(err){
					console.log('数据库添加数据失败')
				}else{
					// res.send('数据库添加数据成功');//如有数据列表，可直接跳转
					
					//在控制器内跳转到响应页面
					res.redirect('../admin/authorList');
					// res.send('数据库添加数据成功');

				}
			})
	    }

	})
	// })
}



adminController.authorList=function(req,res){

	//测试路由是否有问题
	// res.send('测试路由没有问题');


	//获取栏目列表

	//初始
	// authorModel.find(function(err,data){
	//为了排序
    authorModel.find().sort({order:1}).exec(function(err,data){
		if(err){
			console.log('数据库添加数据失败')
		}else{
			//查看data数据的结构
			// console.log(data);

			// res.send('测试路由没有问题');
			// res.send(data);//如有数据列表，可直接跳转

			//响应模版，并分配数据
			res.render('admin/authorList',{authorlist:data});
			// res.redirect('/admin/authorList');
		}
	})
}

// 删除作者
adminController.authorRemove = function(req,res){
    // 数据库删除的操作 
    authorModel.remove({ _id: req.params._id }, function (error) {
        if (error) {
            res.send(error)
        } else {
            // 跳转到作者列表
            res.redirect('/admin/authorList');
        }
    })
}

// 编辑作者的页面
adminController.authorEdit = function (req,res) {
    // 查询需要编辑的数据
    authorModel.find({ _id: req.params._id }, function (err, data) {
        if (err) {
            res.send('查询数据失败')
        } else {            
            // 获取栏目列表
            itemModel.find().sort({ order: 1 }).exec(function (err, itemdata) {
                if (err) {
                    console.log('数据添加数据失败');
                } else {
                    // 响应模版 分配数据
                    res.render('admin/authorEdit', { data: data[0], itemlist: itemdata });
                }
            })
        }
    })
}

// 修改作者文本
adminController.authorUpdate = function(req,res){
    // 更新数据
    authorModel.update({ _id: req.body._id }, { $set: req.body } , function (error) {
        // 跳转到栏目列表
        res.redirect('/admin/authorList');
    })
}

// 修改作者的图片
adminController.authorUpdateImage = function (req,res) {
   
    // 引入图片上传配置
    var imgUpload = require('../configs/imgUpload_config.js');
    // 文件上传的路径
    var imgPath = 'imgUploads'
    // 允许用户上传的图片
    var imgArr = ['image/jpeg', 'image/png', 'image/gif'];
    // 定义文件大小
    var fileSize = 1024 * 1024 * 4;

    // 图片上传
    var upload = imgUpload(imgPath, imgArr, fileSize).single('imgurl');
    upload(req, res, function (err) {
        if (err) {
            res.send('图片上传失败');
        } else {
            // 修改指定作者的封面
            authorModel.update({ _id: req.body._id }, { $set: { imgurl: req.file.filename} }, function (error) {
                if (error) {
                    console.log('数据添加数据失败');
                } else {
                    // 跳转到首页
                    res.redirect('/admin/authorList');
                }
            })
        }
    })   
}




/*外链*/
//添加外链
adminController.linksAdd=function(req,res){
	//响应模版
	res.render('admin/linksAdd');
}

//插入外链数据
adminController.linksInsert=function(req,res){

	//插入数据到数据库

	//查看是否存在数据
	// res.send(req.body);

	linksModel.create(req.body,function(err){
		if(err){
			console.log('数据库添加数据失败')
		}else{
			// res.send('数据库添加数据成功');//如有数据列表，可直接跳转
			
			//在控制器内跳转到响应页面
			res.redirect('/admin/linksList');
		}
	})
}

//外链列表
adminController.linksList=function(req,res){

	//测试路由是否有问题
	// res.send('测试路由没有问题');


	//获取外链列表

	//初始
	// linksModel.find(function(err,data){
	//为了排序
    linksModel.find().sort({order:1}).exec(function(err,data){
		if(err){
			console.log('数据库添加数据失败')
		}else{
			//查看data数据的结构

			// res.send('测试路由没有问题');
			// res.send(data);//如有数据列表，可直接跳转

			//响应模版，并分配数据
			res.render('admin/linksList',{datalist:data});
			console.log(data);
		}
	})
}



// //删除外链数据
// adminController.linksRemove=function(req,res){

// 	// 流程是否走通

// 	res.send('ok');
// 	// req.params._id
// 	// 删除数据

// 	linksModel.remove({_id:req.params._id},function(error){
// 		//跳转到外链列表
// 		res.redirect('/admin/linksList');

// 	})
// }

// 删除外链数据
adminController.linksRemove = function (req,res) {
    // 数据库删除的操作 
    linksModel.remove({ _id: req.params._id},function (error) {
        if (error) {
        	//直接返回错误信息
            res.send(error)
        } else {
            // 跳转到外链列表
            res.redirect('/admin/linksList');
        }
    })
}





/* 登录页面*/
adminController.login = function(req,res){
    // 响应模版
    res.render('admin/login');
}

// 登录操作
adminController.doLogin = function (req,res) {
    // 引入管理员数据模型
    var adminModel = require('../models/adminModel');

    // 引入 md5 模块
    var md5 = require('md5');

    console.log(req.body.code);
    console.log(req.session.code);

    // 判断验证码
    if(req.body.code != req.session.code){
        console.log('验证码不正确');
        res.redirect('/admin/login');
        return ;
    }

    // 获取用户名和密码 并 md5 处理密码
    var username = req.body.username.trim();
    var password = md5(req.body.password.trim());

    // 判断用户名和密码
    adminModel.findOne({username:username},function(err,data){
        // 
        if(data == null){
            console.log('用户名不正确') 
            res.redirect('/admin/login');
        }else{
            if (password==data.password){
                // 登录成功 把用户的信息存到session 里
                req.session.user = data;
                // 跳转到首页
                res.redirect('/admin');
            }else{
                console.log('密码不正确')
                res.redirect('/admin/login');
            }
        }
        
    })
}

// 退出登录
adminController.logout = function (req,res) {
    // 清空登录信息
    req.session.user = null;
    // 跳转到登录的页面
    res.redirect('/admin/login');
}


// 验证码
adminController.code = function(req,res){
	
    // 需要引入 验证码模块
    var captchapng = require('captchapng');
    // 生成一个随机 数字
    var code = parseInt(Math.random() * 9000 + 1000);
    // 存到 session 里
		// console.log(code);
    req.session.code = code;
		
		
    // 实例化验证码对象
    var p = new captchapng(80, 30, code ); // width,height,numeric captcha
    p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)
    // 生成  base64 编码的图片
    var img = p.getBase64();
    var imgbase64 = new Buffer(img, 'base64');
    // 发送数据
    res.send(imgbase64)
	
	

	
}





//暴露控制器
module.exports = adminController;
