import { Table } from 'typeorm'

export class createSurvivors1602801187641 {
  async up(queryRunner) {
    await queryRunner.createTable(
      new Table({
        name: 'survivors',
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
            name: 'age',
            type: 'integer',
          },
          {
            name: 'gender',
            type: 'varchar',
          },
          {
            name: 'infected',
            type: 'boolean',
          },
          {
            name: 'infected_reports',
            type: 'integer',
          },
          {
            name: 'latitude',
            type: 'decimal',
            scale: 10,
            precision: 2,
          },
          {
            name: 'longitude',
            type: 'decimal',
            scale: 10,
            precision: 2,
          },
        ],
      })
    )
  }

  async down(queryRunner) {
    await queryRunner.dropTable('survivors')
  }
}
