import { IDbTransaction } from '@/infra/protocols/db-transaction-protocol'
import { Connection, createConnection, getConnection, getConnectionManager, getConnectionOptions, getRepository, ObjectType, QueryRunner, Repository } from 'typeorm'
import { ConnectionNotFoundError, TransactionNotFoundError } from './database-errors'

export class TypeORMConnection implements IDbTransaction {
  private static instance?: TypeORMConnection
  private query?: QueryRunner
  private connection?: Connection

  private constructor () { }

  static getInstance (): TypeORMConnection {
    if (TypeORMConnection.instance === undefined) TypeORMConnection.instance = new TypeORMConnection()
    return TypeORMConnection.instance
  }

  async connect (envDb: string): Promise<void> {
    const connectionOptions = await getConnectionOptions(envDb)
    this.connection = getConnectionManager().has('default') ? getConnection() : await createConnection({ ...connectionOptions, name: 'default' })
    await this.execMigrations()
  }

  async disconnect (): Promise<void> {
    if (this.connection === undefined) throw new ConnectionNotFoundError()
    await getConnection().close()
    this.query = undefined
    this.connection = undefined
  }

  async openTransaction (): Promise<void> {
    if (this.connection === undefined) throw new ConnectionNotFoundError()
    this.query = this.connection.createQueryRunner()
    await this.query.startTransaction()
  }

  async closeTransaction (): Promise<void> {
    if (this.query === undefined) throw new TransactionNotFoundError()
    await this.query.release()
  }

  async commit (): Promise<void> {
    if (this.query === undefined) throw new TransactionNotFoundError()
    await this.query.commitTransaction()
  }

  async rollback (): Promise<void> {
    if (this.query === undefined) throw new TransactionNotFoundError()
    await this.query.rollbackTransaction()
  }

  getRepository<Entity> (entity: ObjectType<Entity>): Repository<Entity> {
    if (this.connection === undefined) throw new ConnectionNotFoundError()
    if (this.query !== undefined) return this.query.manager.getRepository(entity)
    return getRepository(entity)
  }

  private async execMigrations (): Promise<void> {
    if (this.connection === undefined) throw new ConnectionNotFoundError()
    await this.connection.runMigrations()
  }
}
