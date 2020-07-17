import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class createNotebooks1592415048509 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "notebooks",
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
                        name: "marca",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "modelo",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "memoriaRam",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "placaVideo",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "tipoPlacaVideo",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "processador",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "tamanhoDaTela",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "valor",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "id_funcionario",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "id_contrato",
                        type: "varchar",
                        isNullable: true
                    }
                ]
            })
        )

        // await queryRunner.createForeignKey("notebooks",new TableForeignKey({
        //     columnNames: ["id_contrato"],
        //     referencedColumnNames: ["id"],
        //     referencedTableName: "contratos"
        // }))

        // await queryRunner.createForeignKey("notebooks",new TableForeignKey({
        //     columnNames: ["id_funcionario"],
        //     referencedColumnNames: ["id"],
        //     referencedTableName: "funcionarios"
        // }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("notebooks")
    }

}
