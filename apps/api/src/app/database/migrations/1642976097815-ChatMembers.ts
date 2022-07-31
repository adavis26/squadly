import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class ChatMembers1642976097815 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'chat_members',
        columns: [
          { name: 'chat_id', type: 'int', isNullable: false },
          { name: 'user_id', type: 'int', isNullable: false },
        ],
        foreignKeys: [
          {
            referencedSchema: 'users',
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            columnNames: ['user_id'],
          },
          {
            referencedSchema: 'messaging',
            referencedColumnNames: ['id'],
            referencedTableName: 'chats',
            columnNames: ['chat_id'],
          },
        ],
      }),
      true,
      true,
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
