module.exports = (sequelize, Sequelize) => {

    const Product = sequelize.define('product', {
        sku: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        }
    }, {
            timestamps: false
        })

    Product.associate = models => {
        Product.belongsTo(models.inventory, { foreignKey: 'inventory_id' })
    }

    return Product
}