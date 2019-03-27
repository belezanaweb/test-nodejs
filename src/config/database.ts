import Constants from '../constants'
import Loki from 'lokijs';

const db = new Loki(Constants.DB_NAME);

let produtosCollection = db.getCollection(Constants.DB_COLLECTION);

if(!produtosCollection){
    produtosCollection = db.addCollection(Constants.DB_COLLECTION);
}


export default produtosCollection;
