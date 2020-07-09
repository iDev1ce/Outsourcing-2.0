import {MigrationInterface, QueryRunner, TableForeignKey} from "typeorm";

export class createForeignKey1594147549118 implements MigrationInterface {

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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
