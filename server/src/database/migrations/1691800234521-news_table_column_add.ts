import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewsTableColumnAdd1691800234521 implements MigrationInterface {
  name = 'NewsTableColumnAdd1691800234521';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "news" ADD "company_name" character varying(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "news" DROP COLUMN "company_name"`);
  }
}
