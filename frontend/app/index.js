const path = require('path')
const express = require('express')  

const app = express()

const routes = require('./routes/routes')

app.use(express.static(path.join(__dirname, '../public')));
app.use('/styles', express.static(__dirname + '../public/styles'));
app.use('/scripts', express.static(__dirname + '../public/scripts'));

app.set('views', './public/views')
app.set('view engine', 'ejs')

routes(app)

module.exports = app