import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createTableFotoNotebook1594443239504 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "fotos_notebook",
                columns: [
                    {
                        name: "id",
                        type: "varchar",
                        generationStrategy: "uuid",
                        isUnique: true,
                        isNullable: false,
                        isPrimary: true
                    },
                    {
                        name: "foto",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "notebook_id",
                        type: "varchar",
                        isNullable: true
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("fotos_notebook")
    }

}
