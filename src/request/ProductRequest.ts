import { ProductBusiness } from "../business/ProductBusiness";
import { Process } from "./Process";
import { Message } from './Message';
import { ProductModel } from '../model/ProductModel';

const productBusiness = new ProductBusiness();

export function post (req,res){
    const process = new Process(req,res);
    process.run((req)=>{
        let message = new Message();
        try {
            console.log(req);
            productBusiness.add(req.body);
            message.statusCode = 201;
        } catch (error) {
            message.statusCode = 500;
            message.setPayloadErrorMessage(error);
        }
        return message;
    });

};


export function put (req,res){
    const process = new Process(req, res);
    process.run((req) => {
        let message = new Message();
        try {
            productBusiness.edit(req.body);
            message.statusCode = 201;
        } catch (error) {
            message.statusCode = 500;
            message.setPayloadErrorMessage(error);
        }
        return message;
    });
};

export function _delete (req,res){
    const process = new Process(req, res);
    process.run((req) => {
        let message = new Message();
        try {
            let sku = parseInt(req.params.sku);
            let product = new ProductModel(sku,"");
            productBusiness.delete(product);
            message.statusCode = 200;
        } catch (error) {
            message.statusCode = 404;
            message.setPayloadErrorMessage(error);
        }
        return message;
    });
};

export function get(req, res) {
    const process = new Process(req, res);
    process.run((req) => {
        let message = new Message();
        try {
            let sku = parseInt(req.params.sku);
            let product = new ProductModel(sku, "");
            message.payload = productBusiness.get(product);
            message.statusCode = 200;
        } catch (error) {
            message.statusCode = 404;
            message.setPayloadErrorMessage(error);
        }
        return message;
    });
};