const router = require('express').Router()

router.use('/api/users' , require('./users'))


module.exports = router ;