import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CriarTabelas_1644198683371 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'Warehouse',
      columns: [
        {
          name: 'WarehouseCode',
          type: 'integer',
          isGenerated: true,
          generationStrategy: 'increment',
          isPrimary: true
        },
        {
          name: 'Locality',
          type: 'varchar',
          length: '250'
        },
        {
          name: 'Type',
          type: 'varchar',
          length: '20'
        }
      ],
      checks: [
        {
          name: 'CK_Warehouse_Type',
          columnNames: ['Type'],
          expression: 'Type IN (\'PHYSICAL_STORE\', \'ECOMMERCE\')'
        }
      ]
    }), true)

    await queryRunner.createTable(new Table({
      name: 'Product',
      columns: [
        {
          name: 'ProductCode',
          type: 'integer',
          isPrimary: true
        },
        {
          name: 'Name',
          type: 'varchar',
          length: '250'
        }
      ]
    }), true)

    await queryRunner.createTable(new Table({
      name: 'Inventory',
      columns: [
        {
          name: 'InventoryCode',
          type: 'integer',
          isGenerated: true,
          generationStrategy: 'increment',
          isPrimary: true
        },
        {
          name: 'WarehouseCode',
          type: 'integer'
        },
        {
          name: 'ProductCode',
          type: 'integer'
        },
        {
          name: 'Quantity',
          type: 'integer'
        }
      ],
      uniques: [
        {
          name: 'UK_Inventory_WarehouseCode_ProductCode',
          columnNames: ['WarehouseCode', 'ProductCode']
        }
      ],
      checks: [
        {
          name: 'CK_Inventory_Quantity',
          columnNames: ['Quantity'],
          expression: 'Quantity >= 0'
        }
      ],
      foreignKeys: [
        {
          name: 'FK_Inventory_Warehouse_WarehouseCode',
          columnNames: ['WarehouseCode'],
          referencedColumnNames: ['WarehouseCode'],
          referencedTableName: 'Warehouse'
        },
        {
          name: 'FK_Inventory_Product_ProductCode',
          columnNames: ['ProductCode'],
          referencedColumnNames: ['ProductCode'],
          referencedTableName: 'Warehouse'
        }
      ]
    }), true)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Inventory')
    await queryRunner.dropTable('Product')
    await queryRunner.dropTable('Warehouse')
  }
}
