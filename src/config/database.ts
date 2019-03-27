import Loki from 'lokijs';
import Constants from '../constants';

export default class Database {
    private db : Loki;

    constructor(){
        this.db = new Loki(Constants.DB_NAME);
    }

    public getDb () {
        return this.db.addCollection(Constants.DB_COLLECTION);
    }
} 