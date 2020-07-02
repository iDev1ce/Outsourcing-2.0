import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class createTableFotos1592998982232 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "fotos_computadores",
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
                        name: "computador_id",
                        type: "varchar",
                        isNullable: true
                    }
                ]
            })
        )

        // await queryRunner.createForeignKey(
        //     "fotos", new TableForeignKey({
        //         columnNames: ["computador_id"],
        //         referencedColumnNames: ["id"],
        //         referencedTableName: "computadores"
        //     })
        // )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("fotos")
    }

}
