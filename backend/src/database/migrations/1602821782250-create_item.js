import { Table } from 'typeorm'

export class createItem1602821782250 {
  async up(queryRunner) {
    await queryRunner.createTable(
      new Table({
        name: 'item',
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
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'points',
            type: 'integer',
          },
        ],
      })
    )
  }

  async down(queryRunner) {
    await queryRunner.dropTable('item')
  }
}
