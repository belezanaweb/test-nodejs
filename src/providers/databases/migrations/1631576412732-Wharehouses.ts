import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Wharehouses1631576412732 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'warehouses',
        columns: [{
          name: 'id',
          type: 'integer',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment'
        }, {
          name: 'product_id',
          type: 'integer'
        }, {
          name: 'locality',
          type: 'varchar'
        }, {
          name: 'quantity',
          type: 'smallint'
        }, {
          name: 'type',
          type: 'enum',
          enum: ['ECOMMERCE', 'PHYSICAL_STORE'],
        }, {
          name: "created_at",
          type: "timestamp",
          default: "now()"
        },
        {
          name: "updated_at",
          type: "timestamp",
          default: "now()"
        }],
        foreignKeys: [{
          name: 'FK_warehouses_products',
          referencedTableName: 'products',
          referencedColumnNames: ["sku"],
          columnNames: ["product_id"],
          onDelete: "CASCADE",
          onUpdate: "SET NULL"
        }]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('warehouses');
  }
}
