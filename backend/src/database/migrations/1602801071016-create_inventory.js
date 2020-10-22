import { Table } from 'typeorm'

export class createInventory1602801071016 {
  async up(queryRunner) {
    await queryRunner.createTable(
      new Table({
        name: 'inventory',
        columns: [
          {
            name: 'id',
            type: 'integer',
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'fijii_water',
            type: 'integer',
          },
          {
            name: 'campbell_soup',
            type: 'integer',
          },
          {
            name: 'first_aid_pouch',
            type: 'integer',
          },
          {
            name: 'ak47',
            type: 'integer',
          },
        ],
      })
    )
  }

  async down(queryRunner) {
    await queryRunner.dropTable('inventory')
  }
}
