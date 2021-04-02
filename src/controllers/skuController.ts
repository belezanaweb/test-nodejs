import { saveInSkusJson, setMarketableAndQuantity, getSkusInFile, getSpecificSku, verifySkuIdInvalid, editAndSaveSkusJson, deleteSkuJson } from "./util"; 
import messages from '../constants/messages.json'

export const indexController = () => {
    return {status: 200, body: {status:200, message: getSkusInFile()}}
};

export const specificController = (skuId: number) => {
    try{
        const sku:Sku = getSpecificSku(skuId)
        verifySkuIdInvalid(sku)
        const result = setMarketableAndQuantity(sku)
        return {status: 200, body: {status:200, message: result}}
    }catch(err){
        return {status: 500, body: { message: { status:500, message: err }}}
    }
}

export const editController = (sku:Sku) => {
    try{
        const result = editAndSaveSkusJson(sku)
        return {status: result.status, body: {status:result.status, message: result.body.message}}
    }catch(err){
        const error = { status:500, message: messages.write_error, error: err }
        return {status: 500, body: { log: error}}
    }
}

export const createController = (sku:Sku) => {
    try{
        return saveInSkusJson(sku)
    }catch(err){
        const error = { status:500, message: messages.create_error, error: err }
        return {status: 500, body: { log: error}}
    }
};

export const deleteController = (skuId: number) => {
    try{
        if(!skuId){
            throw messages.invalid_id
        }
        return deleteSkuJson(skuId)
    }catch(error){
        return {status: 500, body:{status: 500, message: error}}
    }
}
