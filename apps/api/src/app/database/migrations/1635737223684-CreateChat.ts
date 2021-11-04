import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateChat1635737223684 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE IF NOT EXISTS messaging.chats (
            id integer NOT NULL,
            name character varying COLLATE pg_catalog."default",
            CONSTRAINT chats_pkey PRIMARY KEY (id)
    )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
