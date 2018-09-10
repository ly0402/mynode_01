// 管理员的首页

var express = require('express');
var router = express.Router();

//引入后台控制器
var adminController=require('../controllers/adminController');

/* 首页 */
router.get('/', adminController.Index);


/*栏目*/
//添加栏目
router.get('/itemAdd', adminController.itemAdd);

//插入栏目数据
router.post('/itemInsert', adminController.itemInsert);


//栏目列表
router.get('/itemList',adminController.itemList);

//修改列表页面
router.get('/itemEdit/:_id',adminController.itemEdit);

//修改栏目数据
router.post('/itemUpdate',adminController.itemUpdate);

//删除栏目数据
router.get('/itemRemove/:_id',adminController.itemRemove);

//删除栏目数据出现错误，检测路由是否有错
// router.get('/itemRemove/:_id',function(req,res){
// 	res.send('测试');
// });



/*作品*/
router.get('/articleAdd', adminController.articleAdd);

//插入作品数据
router.post('/articleInsert', adminController.articleInsert);

//作品列表
router.get('/articleList',adminController.articleList);

//修改作品页面
router.get('/articleEdit/:_id',adminController.articleEdit);

//修改作品数据
router.post('/articleUpdate',adminController.articleUpdate);

//删除作品数据
router.get('/articleRemove/:_id',adminController.articleRemove);

//修改作品的封面
router.post('/articleUpdateImage', adminController.articleUpdateImage);



/*作家*/
router.get('/authorAdd', adminController.authorAdd);

//插入作家数据
router.post('/authorInsert', adminController.authorInsert);

//作家列表
router.get('/authorList',adminController.authorList);

//修改作家页面
router.get('/authorEdit/:_id',adminController.authorEdit);

//修改作家数据
router.post('/authorUpdate',adminController.authorUpdate);

//删除作家数据
router.get('/authorRemove/:_id',adminController.authorRemove);

//修改作家的美照
router.post('/authorUpdateImage', adminController.authorUpdateImage);



/*外链*/
//添加外链
router.get('/linksAdd', adminController.linksAdd);

//插入外链数据
router.post('/linksInsert', adminController.linksInsert);

//外链列表
router.get('/linksList',adminController.linksList);

//删除外链数据
router.get('/linksRemove/:_id',adminController.linksRemove);



//登录页面
router.get('/login',adminController.login);
//登录操作
router.post('/doLogin',adminController.doLogin);
//退出登录
router.get('/logout',adminController.logout);

//注册
// router.post('/signin',adminController.signin);

// 验证码接口
router.get('/code',adminController.code);

module.exports = router;
