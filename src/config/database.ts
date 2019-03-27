import Loki from 'lokijs';

export default class Database {
    private db : Loki;

    constructor(){
        this.db = new Loki('db.json');
    }

    public getDb () {
        return this.db;
    }
} 