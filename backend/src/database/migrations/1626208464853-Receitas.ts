import {
    MigrationInterface,
    QueryRunner,
    Table
} from "typeorm";

export class Receitas1626208464853 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'receitas',
                columns: [
                    {
                        name: 'cod_receita',
                        type: 'serial',
                        isPrimary: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'desc_receita',
                        type: 'varchar',
                        length: '45',
                        isNullable: false,
                    },
                ],
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('receitas');
    }
}
