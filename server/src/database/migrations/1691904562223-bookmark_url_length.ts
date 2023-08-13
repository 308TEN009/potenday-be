import { MigrationInterface, QueryRunner } from 'typeorm';

export class BookmarkUrlLength1691904562223 implements MigrationInterface {
  name = 'BookmarkUrlLength1691904562223';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "bookmark_site" DROP COLUMN "url"`);
    await queryRunner.query(
      `ALTER TABLE "bookmark_site" ADD "url" character varying(500) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "bookmark_site" DROP COLUMN "url"`);
    await queryRunner.query(
      `ALTER TABLE "bookmark_site" ADD "url" character varying(255) NOT NULL`,
    );
  }
}
