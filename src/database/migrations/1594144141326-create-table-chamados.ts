import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class createTableChamados1594144141326 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "chamados",
                columns: [
                    {
                        name: "id",
                        type: "varchar",
                        generationStrategy: "uuid",
                        isNullable: false,
                        isUnique: true
                    },
                    {
                        name: "id_contrato",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "id_notebook",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "id_computador",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "id_impressora",
                        type: "varchar",
                        isNullable: true
                    }
                ]
            })
        )
        
        // await queryRunner.createForeignKey(
        //     "id_contrato",
        //     new TableForeignKey({
        //         columnNames: ["id_contrato"],
        //         referencedColumnNames: ["id"],
        //         referencedTableName: "contratos"
        //     })
        // )

        // await queryRunner.createForeignKey(
        //     "id_notebook",
        //     new TableForeignKey({
        //         columnNames: ["id_notebook"],
        //         referencedColumnNames: ["id"],
        //         referencedTableName: "notebooks"
        //     })
        // )

        // await queryRunner.createForeignKey(
        //     "id_computador",
        //     new TableForeignKey({
        //         columnNames: ["id_computador"],
        //         referencedColumnNames: ["id"],
        //         referencedTableName: "computadores"
        //     })
        // )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("chamados")
    }

}
