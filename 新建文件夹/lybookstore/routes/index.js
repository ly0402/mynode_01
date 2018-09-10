var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// 引入前台控制器
var indexController = require('../controllers/indexController');

/* 首页  */
router.get('/',indexController.index);


//登录页面
router.get('/login',indexController.login);
//登录操作
router.post('/doLogin',indexController.doLogin);
//退出登录
router.get('/logout',indexController.logout);

// 列表-精华作品
router.get('/jhzp',indexController.jhzp);
//作家
router.get('/alie',indexController.alie);

/* 内容页 */
router.get('/nei/:_id',indexController.nei);

//详情-一念心动，一生绵延
router.get('/yy',indexController.yy);

module.exports = router;
