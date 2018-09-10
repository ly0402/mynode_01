//声明一个前台的控制器的模块
var indexController = {};

//引入数据库模型模块
var itemModel = require('../models/itemModel');
var articleModel = require('../models/articleModel');
var authorModel = require('../models/authorModel');
var linksModel = require('../models/linksModel');



//首页
indexController.index = function (req, res, next) {
    //获取栏目列表
    itemModel.find().sort({
        order: 1
    }).exec(function (err, data) {
        if (err) {
            console.log('数据添加数据失败');
        } else {
            getArticleDataList(0)
            // 根据 itemId 去查 10 条文章
            function getArticleDataList(i) {
                articleModel.find({
                    itemId: data[i]._id
                }).limit(10).exec(function (error, data2) {
                    data[i].articleList = data2;
                    if (i < data.length - 1) {
                        // 继续查询下一个栏目的 10 条文章
                        getArticleDataList(++i);
                    } else {
                        // 响应模版 分配数据
                        // res.render('index', { itemlist: data });
                        linksModel.find().sort({
                            order: 1
                        }).exec(function (err, data3) {
                            if (err) {
                                console.log('数据添加数据失败');
                            } else {
                                // 响应模版 分配数据

                                res.render('index', {
                                    itemlist: data,
									articleList:data2,
                                    linksList: data3,
                                })
                            }
                        })
                    }
                })
            }
        }
    })
}

// 列表
indexController.alie = function (req, res, next) {
    //获取栏目列表
    itemModel.find().sort({
        order: 1
    }).exec(function (err, data) {
        if (err) {
            console.log('数据添加数据失败');
        } else {
            getAuthorDataList(0)
            // 根据 itemId 去查 10 条文章
            function getAuthorDataList(i) {
                authorModel.find({
                    itemId: data[i]._id
                }).limit(1).exec(function (error, data1) {
                    data[i].authorList = data1;
                    if (i < data.length - 1) {
                        // 继续查询下一个栏目的 10 条文章
                        getAuthorDataList(++i);
                    } else {
                        // 响应模版 分配数据
                        // res.render('index', { itemlist: data });
                        articleModel.find().sort({
                            order: 1
                        }).exec(function (err, data2) {
                            if (err) {
                                console.log('数据添加数据失败');
                            } else {
                                linksModel.find().sort({
                                    order: 1
                                }).exec(function (err, data3) {
                                    if (err) {
                                        console.log('数据添加数据失败');
                                    } else {
                                        // 响应模版 分配数据
                                        // 响应模版 分配数据
                                        res.render('index/alie', {
                                            data: data[0],
                                            itemList: data,
                                            articleList: data2,
                                            authorList: data1,
                                            linksList: data3
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            }
        }
    })
}


// // 详情1.0
// indexController.nei = function(req, res, next) {
//     //获取栏目列表
//     itemModel.find().sort({order:1}).exec(function(err,data){
//         if (err) {
//             console.log('数据添加数据失败');
//         } else {
//         	getArticleDataList(0)
//         	// 根据 itemId 去查 10 条文章
//         	function getArticleDataList(i){
//         		articleModel.find({itemId:data[i]._id}).limit(1).exec(function(error,data2){
//         			data[i].articleList = data1;        				
//         			if(i < data.length - 1){
//         				// 继续查询下一个栏目的 10 条文章
//         				getArticleDataList(++i);
//         			}else{	
// 			            // 响应模版 分配数据
// 						// res.render('index', { itemlist: data });
// 							linksModel.find().sort({ order: 1 }).exec(function (err, data3) {
// 							if (err) {
// 								console.log('数据添加数据失败');
// 							} else {
// 								// 响应模版 分配数据
// 								res.render('index/nei', {data:  data[0], itemList: data,articleList:data2,linksList:data3})
// 							}
// 						})
//         			}
//         		})
//         	}
//         }
//     })
// }


// 详情2.0
indexController.nei = function (req, res, next) {
    //获取栏目列表

    itemModel.find().sort({
        order: 1
    }).exec(function (err, data) {
        if (err) {
            console.log('数据添加数据失败');
        } else {
            articleModel.find({_id:req.params._id
                
            }).limit(10).exec(function (err, data2) {
				
				// console.log(data2);
                if (err) {
                    console.log('数据添加数据失败');
                } else {
                    linksModel.find().sort({
                        order: 1
                    }).exec(function (err, data3) {
                        if (err) {
                            console.log('数据添加数据失败');
                        } else {
							
							console.log(data2);
							
							
                            // 响应模版 分配数据
                            res.render('index/nei', {
                                datalist: data[0],
								
                                // articleList: data2,
								articleList: data2[0],
					
								
                                linksList: data3,
                            });
                        }
                    })
                }
            })
        }
    })
}


// // 详情3.0
// indexController.nei = function (req, res, next) {
//     //获取栏目列表
// 
//     itemModel.find().sort({
//         order: 1
//     }).exec(function (err, data) {
//         if (err) {
//             console.log('数据添加数据失败');
//         } else {
//             articleModel.find({
//                 
//             }).sort({order:1}).exec(function (err, data2) {
// 				
// 				// console.log(data2);
//                 if (err) {
//                     console.log('数据添加数据失败');
//                 } else {
//                     linksModel.find().sort({
//                         order: 1
//                     }).exec(function (err, data3) {
//                         if (err) {
//                             console.log('数据添加数据失败');
//                         } else {
// 							
// 							console.log(data2);
// 							
// 							
//                             // 响应模版 分配数据
//                             res.render('index/nei', {
//                                 datalist: data,
// 								
//                                 // articleList: data2,
// 								articleList: data2[0],
// 					
// 								
//                                 linksList: data3,
//                             });
//                         }
//                     })
//                 }
//             })
//         }
//     })
// }
// 
// // 详情4.0
// indexController.alie = function (req, res, next) {
//     //获取栏目列表
//     itemModel.find().sort({
//         order: 1
//     }).exec(function (err, data) {
//         if (err) {
//             console.log('数据添加数据失败');
//         } else {
//             getArticleDataList(0)
//             // 根据 itemId 去查 10 条文章
//             function getArticleDataList(i) {
//                 articleModel.find({
//                     itemId: data[i]._id
//                 }).limit(1).exec(function (error, data1) {
//                     data[i].articleList = data1;
//                     if (i < data.length - 1) {
//                         // 继续查询下一个栏目的 10 条文章
//                         getArticleDataList(++i);
//                     } else {
//                         // 响应模版 分配数据
//                         // res.render('index', { itemlist: data });
//                         authorModel.find().sort({
//                             order: 1
//                         }).exec(function (err, data2) {
//                             if (err) {
//                                 console.log('数据添加数据失败');
//                             } else {
//                                 linksModel.find().sort({
//                                     order: 1
//                                 }).exec(function (err, data3) {
//                                     if (err) {
//                                         console.log('数据添加数据失败');
//                                     } else {
//                                         // 响应模版 分配数据
//                                         // 响应模版 分配数据
//                                         res.render('index/nei', {
//                                             data: data[0],
//                                             itemList: data,
//                                             authorList: data2,
//                                             articleList: data1,
//                                             linksList: data3
//                                         })
//                                     }
//                                 })
//                             }
//                         })
//                     }
//                 })
//             }
//         }
//     })
// }


/* 登录页面*/
indexController.login = function (req, res) {
    // 响应模版
    res.render('index/login');
}

// 登录操作
indexController.doLogin = function (req, res) {
    // 引入管理员数据模型
    var indexModel = require('../models/indexModel');

    // 引入 md5 模块
    var md5 = require('md5');

    //     console.log(req.body.code);
    //     console.log(req.session.code);



    // 获取用户名和密码 并 md5 处理密码
    var username = req.body.username.trim();
    var password = md5(req.body.password.trim());

    // 判断用户名和密码
    indexModel.findOne({
        username: username
    }, function (err, data) {
        // 
        if (data == null) {
            console.log('用户名不正确')
            res.redirect('/index/login');
        } else {
            if (password == data.password) {
                // 登录成功 把用户的信息存到session 里
                req.session.user = data;
                // 跳转到首页
                res.redirect('/');
            } else {
                console.log('密码不正确')
                res.redirect('/index/login');
            }
        }

    })
}

// 退出登录
indexController.logout = function (req, res) {
    // 清空登录信息
    req.session.user = null;
    // 跳转到登录的页面
    res.redirect('/index/login');
}

//列表-精华作品
indexController.jhzp = function (req, res) {
    //响应模版
    // res.send('111');
    res.render('index/jhzp');
}

//列表-作家


//详情-一念心动，一生绵延
indexController.yy = function (req, res) {
    //响应模版
    // res.send('111');
    res.render('index/yy');
}


// 暴露控制器
module.exports = indexController;
