const express = require('express')
const  routes  = require("./routes/index")
const app = express();


app.set('view engine', 'ejs');
app.use(express.static('public'))
app.set('views', __dirname + '/views');

app.use('/fa', express.static(__dirname + '/node_modules/font-awesome/css'))
app.use('/fonts', express.static(__dirname + '/node_modules/font-awesome/fonts'))
app.use(routes);

app.use((req, res) => {
    res.render('error', {message:'Page not found!'})
  });

  app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const name = err.name || 'Error';
    res
      .status(statusCode)
      .json({ name, message: err.message });
  });
module.exports = app;