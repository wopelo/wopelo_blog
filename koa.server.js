const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');
const serve = require('koa-static');

const app = new Koa();
const router = new Router();

app.use(serve('./dist'));
app.use(koaBody()).use(router.routes());

app.listen(82);

//koa返回结果到客户端
function backClient(ctx,result){
	ctx.response.type = 'json';
	ctx.response.body = result;
}

//获取签名
router.get('/api/saying',async(ctx) => {
	let findSaying = require("./api/server/saying.js");
	await findSaying().then((result) => {
	  backClient(ctx,result);
	}).catch((err) => {
	  backClient(ctx,err);
	});
});

//获取文章类型列表
router.get('/api/getType',async(ctx) => {
	let getType = require("./api/server/getType.js");
	await getType().then((result) => {
		backClient(ctx,result);
	}).catch((err) => {
		backClient(ctx,err);
	});
});

//验证管理员身份
router.post('/api/haveUser',async(ctx) => {
	let haveUser = require("./api/server/user.js");
	let body = ctx.request.body;
	await haveUser(body.name, body.password).then((result) => {
      backClient(ctx, result);
    }).catch((err) => {
      backClient(ctx, err);
    });
});

//检查验证码
router.post('/api/check',async(ctx) => {
	let check = require("./api/server/checkCode.js");
	let body = ctx.request.body;
	await check(body.code).then((result) => {
      backClient(ctx, result);
    }).catch((err) => {
      backClient(ctx, err);
    });
});

//修改签名
router.post('/api/modifySaying',async(ctx) => {
	let modifySaying = require("./api/server/modifySaying.js");
	let body = ctx.request.body;
	await modifySaying(body.num, body.newSaying).then((result) => {
      backClient(ctx, result);
    }).catch((err) => {
      backClient(ctx, err);
    });
});

//删除种类
router.post('/api/deleteType',async(ctx) => {
	let deleteType = require("./api/server/deleteType.js");
	let body = ctx.request.body;
	await deleteType(body.code, body.type).then((result) => {
      backClient(ctx, result);
    }).catch((err) => {
      backClient(ctx, err);
    });
});

//添加种类
router.post('/api/addType',async(ctx) => {
	let addType = require("./api/server/addType.js");
	let body = ctx.request.body;
	await addType(body.code, body.type).then((result) => {
	  backClient(ctx, result);
	}).catch((err) => {
	  backClient(ctx, err);
	})
});

//添加新文章
router.post('/api/newBlog',async(ctx) => {
	let newBlog = require("./api/server/newBlog.js");
	let body = ctx.request.body;
	await newBlog(body.code, body.title, body.type, body.content).then((result) => {
      backClient(ctx, result);
    }).catch((err) => {
      backClient(ctx, err);
    });
});

//获取个人相关
router.get('/api/getAbout',async(ctx) => {
	let getAbout = require("./api/server/getAbout.js");
	await getAbout().then((result) => {
      backClient(ctx, result);
    }).catch((err) => {
      backClient(ctx, err);
    });
});

//修改个人相关
router.post('/api/modifyAbout',async(ctx) => {
	let modifyAbout = require("./api/server/modifyAbout.js");
	let body = ctx.request.body;
	await modifyAbout(body.code, body.newArticle).then((result) => {
	  backClient(ctx, result);
	}).catch((err) => {
	  backClient(ctx, err);
	});
});

//获取全部博客列表
router.post('/api/getList',async(ctx) => {
	let getList = require("./api/server/getList.js");
	let body = ctx.request.body;
	await getList(body.jump).then((result) => {
      backClient(ctx, result);
    }).catch((err) => {
      backClient(ctx, err);
    });
});

//获取某类型列表
router.post('/api/getTarget',async(ctx) => {
	let getList = require("./api/server/getTarget.js");
	let body = ctx.request.body;
	await getList(body.jump, body.type).then((result) => {
	  backClient(ctx, result);
	}).catch((err) => {
	  backClient(ctx, err);
	});
});

//获取指定博客
router.post('/api/getBlog',async(ctx) => {
	let getBlog=require("./api/server/getBlog.js");
	let body = ctx.request.body;
	await getBlog(body.target).then((result) => {
      backClient(ctx, result);
    }).catch((err) => {
      backClient(ctx, err);
    });
});

//获取总篇数
router.post('/api/getTotal',async(ctx) => {
	let getTotal = require("./api/server/getTotal.js");
	await getTotal().then((result) => {
      backClient(ctx, result);
    }).catch((err) => {
      backClient(ctx, err);
    });
});

//获取某类型总篇数
router.post('/api/getTargetAll',async(ctx) => {
	let getTotal = require("./api/server/getTargetAll.js");
	let body = ctx.request.body;
	await getTotal(body.type).then((result) => {
	  backClient(ctx, result);
	}).catch((err) => {
	  backClient(ctx, err);
	});
});

//删除某篇博客
router.post('/api/removeBlog',async(ctx) => {
	let getTotal = require("./api/server/removeBlog.js");
	let body = ctx.request.body;
	await getTotal(body.code, body.target, body.type).then((result) => {
	  backClient(ctx, result);
	}).catch((err) => {
	  backClient(ctx, err);
	});
});

//修改某篇博客
router.post('/api/modifyBlog',async(ctx) => {
	let getTotal = require("./api/server/modifyBlog.js");
	let body = ctx.request.body;
	await getTotal(body.code, body.target, body.newTitle, body.newContent).then((result) => {
	  backClient(ctx, result);
	}).catch((err) => {
	  backClient(ctx, err);
	});
});