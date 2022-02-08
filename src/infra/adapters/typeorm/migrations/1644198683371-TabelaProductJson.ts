import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class TabelaProductJson_1644198683371 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'ProductJSON',
      columns: [
        {
          name: 'CodigoProduct',
          type: 'integer',
          isPrimary: true
        },
        {
          name: 'Value',
          type: 'text'
        }
      ]
    }), true)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('ProductJSON')
  }
}
