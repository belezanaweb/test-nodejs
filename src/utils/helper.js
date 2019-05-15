const parseWarehouses = (data) => {
  const warehouses = []

  if (data) {
    for (const i in data.warehouses) {
      const warehouse = {
        locality: data.warehouses[i].locality,
        quantity: data.warehouses[i].quantity,
        type: data.warehouses[i].type
      }

      warehouses.push(warehouse)
    }
  }

  return warehouses
}

const getTotalQuantity = (data) => {
  return data.inventory.warehouses.reduce(function (total, warehouse) {
    return total + warehouse.quantity
  }, 0)
}

module.exports = { parseWarehouses, getTotalQuantity }
