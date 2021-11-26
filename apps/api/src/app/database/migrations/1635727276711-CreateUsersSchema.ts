import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersSchema1635727276711 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE TABLE IF NOT EXISTS users.users (
                id integer NOT NULL,
                first_name character varying COLLATE pg_catalog."default",
                last_name character varying COLLATE pg_catalog."default",
                CONSTRAINT users_pkey PRIMARY KEY (id)
        )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
