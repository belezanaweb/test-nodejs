const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')

module.exports = (app) => {

    const sequelize = new Sequelize('postgres://postgres:1234@localhost:5432/teste')

    sequelize.authenticate().then(() => {
        console.log('\n__________ Conectado ao Banco de Dados __________\n')
    })

    const db = {
        sequelize,
        Sequelize,
        models: {}
    }

    const dir = path.join(__dirname, "../models")
    fs.readdirSync(dir).forEach(file => {
        const modelDir = path.join(dir, file)
        const model = sequelize.import(modelDir)
        db.models[model.name] = model
    })

    for (let key of Object.keys(db.models)) {
        if (db.models[key].associate) {
            db.models[key].associate(db.models)
        }
    }

    return db
}