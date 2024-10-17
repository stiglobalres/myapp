const {config}  = require("./config/app");
const app = require('./app')

app.listen(config.port,()=>{
    console.log(`server is running at http://127.0.0.1:${config.port}`)
})
