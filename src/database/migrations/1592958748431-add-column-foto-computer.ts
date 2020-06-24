import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class addColumnFotoComputer1592958748431 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("computadores", new TableColumn({
            name: "foto",
            type: "varchar",
            isNullable: true
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("computadores", "foto")
    }

}
