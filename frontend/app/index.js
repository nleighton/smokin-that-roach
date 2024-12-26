const path = require('path')
const express = require('express')  

const app = express()

const routes = require('./routes/routes')

app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/img', express.static(__dirname + 'public/img'));

app.set('views', './public/views')
app.set('view engine', 'ejs')

routes(app)

module.exports = app