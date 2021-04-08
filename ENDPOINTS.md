## Endpoints

## **POST** Create Product

**Path:** `/product/create`

**Body:**

```json
{
    "sku": 43264,
    "name": "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
    "inventory": {
        "quantity": 15,
        "warehouses": [
            {
                "locality": "SP",
                "quantity": 12,
                "type": "ECOMMERCE"
            },
            {
                "locality": "MOEMA",
                "quantity": 3,
                "type": "PHYSICAL_STORE"
            }
        ]
    }
}
```
**Response:**
```json
{
    "message": "Product created"
}
```

## **GET** Product by Sku

**Path:** `/product/update`

**Path Param**: product's sku

**Response:**

```json
{
    "product": {
        "sku": 43264,
        "name": "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
        "inventory": {
            "quantity": 16,
            "warehouses": [
                {
                    "locality": "SP",
                    "quantity": 12,
                    "type": "ECOMMERCE"
                },
                {
                    "locality": "MOEMA",
                    "quantity": 3,
                    "type": "PHYSICAL_STORE"
                }
            ]
        },
        "isMarketable": true
    }
}
```
## **PUT** Update Product

**Path:** `/product/update`

**Path Param**: product's sku (optional!)

**Body:**

```json
{
    "name": "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium",
    "inventory": {
        "quantity": 12,
        "warehouses": [
            {
                "locality": "PR",
                "quantity": 12,
                "type": "ECOMMERCE"
            },
            {
                "locality": "MOEMA",
                "quantity": 3,
                "type": "PHYSICAL_STORE"
            }
        ]
    }
}
```
**Response:**
```json
{
    "message": "Product updated"
}
```

## **DELETE** Product by Sku

**Path:** `/product/delete`

**Path Param**: product's sku

**Response:**

```json
{
    "message": "Product deleted"
}
```