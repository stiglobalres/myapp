const express = require('express')
const {config}  = require("./config/app");
const  routes  = require("./routes/index")
const app = express();


app.set('view engine', 'ejs');
app.use(express.static('public'))
app.set('views', __dirname + '/views');

app.use('/fa', express.static(__dirname + '/node_modules/font-awesome/css'))
app.use('/fonts', express.static(__dirname + '/node_modules/font-awesome/fonts'))
app.use(routes);

app.listen(config.port,()=>{
    console.log(`server is running at http://127.0.0.1:${config.port}`)
})

module.exports = app;