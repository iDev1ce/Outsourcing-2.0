import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class createComputador1592419349975 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'computadores',
                columns: [
                    {
                        name: "id",
                        type: "varchar",
                        isPrimary: true,
                        isNullable: false,
                        isUnique: true,
                        generationStrategy: "uuid"
                    },
                    {
                        name: "fonte",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "memoriaRam",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "mouse",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "teclado",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "monitor",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "processador",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "placaMae",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "placaRede",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "placaVideo",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "valor",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "contrato_id",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "id_funcionario",
                        type: "varchar",
                        isNullable: true
                    }
                ]
            })
        )

        // await queryRunner.createForeignKey("computadores", new TableForeignKey({
        //     columnNames: ["id_contrato"],
        //     referencedColumnNames: ["id"],
        //     referencedTableName: "contratos"
        // }))

        // await queryRunner.createForeignKey("computadores", new TableForeignKey({
        //     columnNames: ["id_funcionario"],
        //     referencedColumnNames: ["id"],
        //     referencedTableName: "funcionarios"
        // }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("computadores")
    }

}
