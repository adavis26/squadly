import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateMessagingSchema1613350818337 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`CREATE SCHEME IF NOT EXISTS messaging;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`DROP SCHEMA IF EXISTS messaging;`);
    }

}
