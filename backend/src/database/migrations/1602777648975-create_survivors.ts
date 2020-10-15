import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createSurvivors1602777648975 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
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
                }

            ],
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable('survivors');
    }

}
