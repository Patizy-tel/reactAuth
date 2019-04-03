const express = require('express')
const  mongoose =  require('mongoose')
const config = require('./config/keys.js')
const bodyParser = require('body-parser')
const app  = express();

//middle ware

app.use(bodyParser.urlencoded({
    extended:false
}))

app.use(bodyParser.json())
 
/////db connection
mongoose.connect(config.db,{useNewUrlParser:true})
        .then(console.log('db is up'))
        .catch(err=>(console.log(err.message)))


//port and listen

app.listen(config.port ,()=>{

    console.log(`listening on port ${config.port}`)

})


module.exports = app ;