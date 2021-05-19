const router = require('express').Router();
const userRoutes = require('./userRoutes');
const projectRoutes = require('./projectRoutes');


// model file folder calls
router.use('/user', userRoutes);
router.use('/projects', projectRoutes);

module.exports = router;