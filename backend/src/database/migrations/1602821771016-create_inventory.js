import { Table } from 'typeorm'

export class createInventory1602821771016 {
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
        ],

      })
    )
  }

  async down(queryRunner) {
    await queryRunner.dropTable('inventory')
  }
}
