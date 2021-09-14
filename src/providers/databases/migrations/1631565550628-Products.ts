import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Products1631565550628 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'products',
        columns: [{
          name: 'sku',
          type: 'integer',
          isPrimary: true
        }, {
          name: 'name',
          type: 'varchar'
        }, {
          name: "created_at",
          type: "timestamp",
          default: "now()"
        },
        {
          name: "updated_at",
          type: "timestamp",
          default: "now()"
        }]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('products');
  }
}
