import { TypeORMConnection } from '@/infra/adapters/typeorm/helpers/typeorm-connection'
import { ObjectType, Repository } from 'typeorm'

export abstract class TypeORMRepository {
  constructor (
    private readonly connection: TypeORMConnection = TypeORMConnection.getInstance()
  ) {}

  getRepository<Entity> (entity: ObjectType<Entity>): Repository<Entity> {
    return this.connection.getRepository(entity)
  }
}
