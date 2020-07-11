import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createTableFotoImpressora1594443376433 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "fotos_impressora",
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
                        name: "impressora_id",
                        type: "varchar",
                        isNullable: true
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("foto_impressora")
    }

}
