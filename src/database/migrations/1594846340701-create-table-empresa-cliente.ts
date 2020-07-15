import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createTableEmpresaCliente1594846340701 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "empresas_clientes",
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
                        name: "estado",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "telefone",
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
                        name: "email",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "cnpj",
                        type: "varchar",
                        isNullable: false,
                        isUnique: true
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
