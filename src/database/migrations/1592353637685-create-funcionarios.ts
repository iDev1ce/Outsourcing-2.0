import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class createFuncionarios1592353637685 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "funcionarios",
                columns: [
                    {
                        name: "id",
                        type: "varchar",
                        isNullable: false,
                        isPrimary: true,
                        isUnique: true,
                        generationStrategy: "uuid"
                    },
                    {
                        name: "cpf",
                        type: "varchar",
                        isNullable: false,
                        isUnique: true
                    },
                    {
                        name: "nome",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "email",
                        type: "varchar",
                        isUnique: true,
                        isNullable: true
                    },
                    {
                        name: "senha",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "id_contrato",
                        type: "varchar",
                        isNullable: true,
                        isUnique: true
                    }
                ]
            })
        )

        await queryRunner.createForeignKey("funcionarios", new TableForeignKey({
            columnNames: ["id_contatos"],
            referencedColumnNames: ["id"],
            referencedTableName: "contratos"
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("funcionarios")
    }

}
