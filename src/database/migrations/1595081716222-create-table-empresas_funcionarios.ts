import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createTableEmpresasFuncionarios1595081716222 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "empresas_funcionarios",
                columns: [
                    {
                        name: "id",
                        type: "varchar",
                        generationStrategy: "uuid",
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
                        isNullable: false,
                        isUnique: true
                    },
                    {
                        name: "senha",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "cnpj",
                        type: "varchar",
                        isNullable: false,
                        isUnique: true
                    },
                    {
                        name: "estado",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "cidade",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "bairro",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "rua",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "numero",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "cep",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "telefone",
                        type: "varchar",
                        isNullable: false,
                        isUnique: true
                    },
                    {
                        name: "email_comercial",
                        type: "varchar",
                        isNullable: false,
                        isUnique: true
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("empresas_funcionarios")
    }

}
