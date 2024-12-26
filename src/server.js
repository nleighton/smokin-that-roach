const path = require('path')
const express = require('express')
const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, 'public')));
app.use('/styles', express.static(__dirname + 'public/styles'));
app.use('/scripts', express.static(__dirname + 'public/scripts'));

app.set('views', path.join(__dirname, 'public', 'views'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index', { msg: "if you see this it means it's fucking working", sub: "sent from server btw" })
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})