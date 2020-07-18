import {MigrationInterface, QueryRunner, TableForeignKey} from "typeorm";

export class createTableForeignKey1595081732000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Impressoras
        await queryRunner.createForeignKey("impressoras", new TableForeignKey({
            columnNames: ["id_contrato"],
            referencedColumnNames: ["id"],
            referencedTableName: "contratos"
        }))

        await queryRunner.createForeignKey("impressoras", new TableForeignKey({
            columnNames: ["id_funcionario"],
            referencedColumnNames: ["id"],
            referencedTableName: "funcionarios"
        }))

        // Funcionarios
        // await queryRunner.createForeignKey("funcionarios", new TableForeignKey({
        //     columnNames: ["id_contato"],
        //     referencedColumnNames: ["id"],
        //     referencedTableName: "contratos"
        // }))

        // Notebooks
        await queryRunner.createForeignKey("notebooks",new TableForeignKey({
            columnNames: ["id_contrato"],
            referencedColumnNames: ["id"],
            referencedTableName: "contratos"
        }))

        await queryRunner.createForeignKey("notebooks",new TableForeignKey({
            columnNames: ["id_funcionario"],
            referencedColumnNames: ["id"],
            referencedTableName: "funcionarios"
        }))

        // Computadores
        await queryRunner.createForeignKey("computadores", new TableForeignKey({
            columnNames: ["contrato_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "contratos"
        }))

        await queryRunner.createForeignKey("computadores", new TableForeignKey({
            columnNames: ["id_funcionario"],
            referencedColumnNames: ["id"],
            referencedTableName: "funcionarios"
        }))

        // Fotos Computadores
        await queryRunner.createForeignKey(
            "fotos_computadores", new TableForeignKey({
                columnNames: ["computador_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "computadores"
            })
        )

        // Contratos
        await queryRunner.createForeignKey("contratos", new TableForeignKey({
            columnNames: ["id_funcionario"],
            referencedColumnNames: ["id"],
            referencedTableName: "funcionarios"
        }))

        await queryRunner.createForeignKey("contratos", new TableForeignKey({
            columnNames: ["id_cliente"],
            referencedColumnNames: ["id"],
            referencedTableName: "usuarios"
        }))

        // Chamados
        await queryRunner.createForeignKey(
            "chamados",
            new TableForeignKey({
                columnNames: ["id_contrato"],
                referencedColumnNames: ["id"],
                referencedTableName: "contratos"
            })
        )

        await queryRunner.createForeignKey(
            "chamados",
            new TableForeignKey({
                columnNames: ["id_notebook"],
                referencedColumnNames: ["id"],
                referencedTableName: "notebooks"
            })
        )

        await queryRunner.createForeignKey(
            "chamados",
            new TableForeignKey({
                columnNames: ["id_computador"],
                referencedColumnNames: ["id"],
                referencedTableName: "computadores"
            })
        )

        await queryRunner.createForeignKey(
            "chamados",
            new TableForeignKey({
                columnNames: ["id_cliente"],
                referencedColumnNames: ["id"],
                referencedTableName: "usuarios"
            })
        )

        await queryRunner.createForeignKey(
            "chamados",
            new TableForeignKey({
                columnNames: ["id_funcionario"],
                referencedColumnNames: ["id"],
                referencedTableName: "funcionarios"
            })
        )

        // Fotos Impressoras
        await queryRunner.createForeignKey(
            "fotos_impressora", new TableForeignKey({
                columnNames: ["impressora_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "impressoras"
            })
        )

        // Fotos Notebooks
        await queryRunner.createForeignKey(
            "fotos_notebook", new TableForeignKey({
                columnNames: ["notebook_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "notebooks"
            })
        )

        // Usuario Empresa
        await queryRunner.createForeignKey(
            "usuarios", new TableForeignKey({
                columnNames: ["id_empresa"],
                referencedColumnNames: ["id"],
                referencedTableName: "empresas_clientes"
            })
        )

        // Empresa Funcionario
        await queryRunner.createForeignKey(
            "funcionarios", new TableForeignKey({
                columnNames: ["empresa_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "empresas_funcionarios"
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
