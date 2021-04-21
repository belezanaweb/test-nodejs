import db from '../lib/Database'

export default abstract class Model {
    protected static _tableName: string;
    protected static _primaryKey: string;

    static get tableName() { return this._tableName };
    static get primaryKey() { return this._primaryKey };

    async insert(config: any): Promise<any> {
        const { data, fields, table } = config
        const [result] = await db.insert(data, fields).into(table)

        return result
    }

    async update(data: any): Promise<void> {
        const { where, whereParams, table, values } = data

        await db(table).whereRaw(where, whereParams).update(values)
    }

    static async findOne(config: any): Promise<any> {
        const { where, whereParams, fields, table } = config


        const [result] = await db.select(fields)
            .from(table)
            .whereRaw(where, whereParams)
            .limit(1)

        return result
    }

    static async findMany(config: any): Promise<any> {
        const { where, whereParams, fields, table } = config

        const result = await db.select(fields)
            .from(table)
            .whereRaw(where, whereParams)

        return result
    }

    static async delete(config: any): Promise<void> {
        const { where, whereParams, table } = config

        await db(table).whereRaw(where, whereParams).del()
    }

}