import messages from '../constants/messages.json'

export const saveInSkusJson = (sku:Sku) => {
    try {
        verifySkuIdiSValid(sku)
        const arraySkus = getSkusInFile()
        verifySkuIdDuplicate(arraySkus, sku)
        const skuWithValues = setMarketableAndQuantity(sku)
        arraySkus.push(skuWithValues)
        writeSkusInFile(arraySkus)
        return {status: 201, body:{status: 201, message: messages.create_success}}
    } catch(error) {
        return {status: 500, body:{status: 500, message:error}}
    }
}

const verifySkuIdiSValid = (sku:Sku) => {
    if(!Number(sku.sku)){
        throw messages.create_error
    }
}

export const getSkusInFile = () => {
    const fs = require('fs');
    const path = './dist/skus.json'
    try{
        const skus = fs.readFileSync(path)
        return JSON.parse(skus)
    }catch{
        throw messages.read_error
    }
}

const verifySkuIdDuplicate = (skusObject:Sku[], sku:Sku) => {
    skusObject.forEach(skuSended => {
        if(skuSended.sku == sku.sku){
            throw messages.duplicate_error
        }
    });
}

export const setMarketableAndQuantity = (sku:Sku) => {
    sku.inventory.quantity = calculateQuantity(sku)
    sku.isMarketable = setMarketable(sku)
    return sku
}

const writeSkusInFile = (skus:Sku[]) => {
    const fs = require('fs');
    const path = './dist/skus.json'
    try{
        fs.writeFileSync(path, JSON.stringify(skus))
    }catch{
        throw messages.write_error
    }
}

const calculateQuantity = (sku:Sku) => {
    let quantity = 0
    sku.inventory.warehouses.forEach(warehouse => {
        quantity += warehouse.quantity
    });
    return quantity
}

const setMarketable = (sku:Sku) => {
    if(calculateQuantity(sku) > 0){
        return true
    }
    return false
}

export const getSpecificSku = (skuId: number) => {
    const skus:Sku[] = getSkusInFile()
    let sku = skus[0]
    if(skuId == skus[0].sku){
        return sku
    }

    skus.forEach(product => {
        if(product.sku == skuId){
            sku = product
        }
    });

    if(sku.sku == skus[0].sku){
        sku.sku = 0
        return sku
    }
    return sku
}

export const verifySkuIdExistInFile = (skus:Sku[], skuEdit:Sku) => {
    const arraySkusNew = skus.filter(sku => {
        return sku.sku != skuEdit.sku
    });
    if(JSON.stringify(arraySkusNew) == JSON.stringify(skus)){
        throw messages.edit_error
    }
    return arraySkusNew
}

export const editAndSaveSkusJson = (skuEdit:Sku) => {
    try{
        const arraySkus:Sku[] = getSkusInFile()
        const arraySkusNew = verifySkuIdExistInFile(arraySkus, skuEdit)
        const skuEditNewValues = setMarketableAndQuantity(skuEdit)
        arraySkusNew.push(updateSku(skuEditNewValues))
        writeSkusInFile(arraySkusNew)
        return {status: 200, body: {status:200, message:messages.edit_success}}
    }catch(error){
        return {status: 500, body: {status:500, message:error}}
    }   
}

export const updateSku = (skuSended:Sku) => {
    let skuNew:Sku = skuSended
    const skuOld:Sku = getSpecificSku(skuNew.sku)
    skuNew.sku = skuOld.sku
    return skuNew
}

export const deleteSkuJson = (skuId:number) => {
    try{
        const arraySkus:Sku[] = getSkusInFile()
        const arraySkusNew = arraySkus.filter(sku => {
            return sku.sku != skuId
        });
        if(JSON.stringify(arraySkus) == JSON.stringify(arraySkusNew)){
            throw messages.invalid_id
        }
        writeSkusInFile(arraySkusNew)
        return {status: 200, body:{status: 200, message: messages.delete_success}}
    }catch(error){
        return {status: 500, body: {status:500, message:error}}
    }
}

export const verifySkuIdInvalid = (sku:Sku) => {
    if(sku.sku === 0){
        throw messages.id_not_found
    }
}
