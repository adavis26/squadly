import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateMessages1613350667093 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'messages',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isNullable: false,
          },
          {
            name: 'userId',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'chatId',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'timestamp',
            type: 'date',
            isNullable: false,
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable('messaging.messages', true);
  }
}
