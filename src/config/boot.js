module.exports = app => {
    //Faz o sync dos models no banco de dados
    app.src.config.db.sequelize.sync({ force: false }).done(() => {
        console.log('Backend iniciado com sucesso')
    })
}