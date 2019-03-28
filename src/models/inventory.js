module.exports = (sequelize, Sequelize) => {

    const Inventory = sequelize.define('inventory', {
        inventory_id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        warehouses: {
            type: Sequelize.ARRAY(Sequelize.JSON),
        }
    }, {
            timestamps: false
        })

    Inventory.associate = models => {
        Inventory.hasOne(models.product, { foreignKey: 'inventory_id' })
    }

    return Inventory
}