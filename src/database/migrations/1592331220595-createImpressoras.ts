import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createImpressoras1592331220595 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "impressoras",
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
                        isNullable: false
                    },
                    {
                        name: "modelo",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "tipo",
                        type: "varchar",
                        isNullable: false
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("impressoras")
    }

}
