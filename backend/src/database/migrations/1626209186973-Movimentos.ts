import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey
} from "typeorm";

export class Movimentos1626209186973 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'movimentos',
                columns: [
                    {
                        name: 'cod_movimento',
                        type: 'serial',
                        isPrimary: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'desc_movimento',
                        type: 'varchar',
                        length: '45',
                        isNullable: false,
                    },
                    {
                        name: 'dt_movimento',
                        type: 'date',
                        isNullable: false
                    },
                    {
                        name: 'valor',
                        type: 'decimal(10, 2)',
                        isNullable: false
                    },
                    {
                        name: 'cod_receita',
                        type: 'integer',
                        isNullable: false
                    },
                    {
                        name: 'cod_despesa',
                        type: 'integer',
                        isNullable: false
                    }
                ],
            })
        );
        await queryRunner.createForeignKey(
            'movimentos',
            new TableForeignKey({
                name: 'Receitas',
                columnNames: ['cod_receita'],
                referencedColumnNames: ['cod_receita'],
                referencedTableName: 'receitas',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            })
        );
        await queryRunner.createForeignKey(
            'movimentos',
            new TableForeignKey({
                name: 'Despesas',
                columnNames: ['cod_despesa'],
                referencedColumnNames: ['cod_despesa'],
                referencedTableName: 'despesas',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('movimentos');
    }
}
