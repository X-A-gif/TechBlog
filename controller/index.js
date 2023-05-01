const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRouter');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;