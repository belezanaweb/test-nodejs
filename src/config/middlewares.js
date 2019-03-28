const bodyParser = require('body-parser')

module.exports = app => {

    app.use(bodyParser.json())
    app.listen(3000)
}