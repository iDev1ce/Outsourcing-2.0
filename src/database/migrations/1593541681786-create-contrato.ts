import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class createContrato1593541681786 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "contratos",
            columns: [
                {
                    name: "id",
                    type: "varchar",
                    generationStrategy: "uuid",
                    isNullable: false,
                    isUnique: true
                },
                {
                    name: "id_funcionario",
                    type: "varchar",
                    isNullable: true
                },
                {
                    name: "id_cliente",
                    type: "varchar",
                    isNullable: false
                }
            ]
        }))

        // await queryRunner.createForeignKey("contratos", new TableForeignKey({
        //     columnNames: ["id_funcionario"],
        //     referencedColumnNames: ["id"],
        //     referencedTableName: "funcionarios"
        // }))

        // await queryRunner.createForeignKey("contratos", new TableForeignKey({
        //     columnNames: ["id_cliente"],
        //     referencedColumnNames: ["id"],
        //     referencedTableName: "usuarios"
        // }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("contratos")
    }

}
