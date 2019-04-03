var mongoose = require('mongoose') ;
const confi = require('../config/index')

mongoose.connect(confi.mydb,{ useNewUrlParser: true })
        .then(console.log('db now runnning bho zvekuti'))
        .catch(err=>console.error(err.message))


module.exports = mongoose
