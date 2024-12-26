const routes = async (app) => {
    app.get('/', (req, res) => {
        res.render('index', { msg: "if you see this it means it's fucking working", sub: "sent from server btw" })
    })
}

module.exports = routes