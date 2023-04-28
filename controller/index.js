const router = require('koa-router')()

const homeRouter = require('./home-routes.js');

router.use('/', homeRouter);

module.exports = router;