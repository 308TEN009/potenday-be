import { MigrationInterface, QueryRunner } from 'typeorm';

export class EopTableColumAdded1691675181940 implements MigrationInterface {
  name = 'EopTableColumAdded1691675181940';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "employment_opportunity" ADD "job_description" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "employment_opportunity" ADD "apply_status" character varying(20) NOT NULL DEFAULT 'draft'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "employment_opportunity" DROP COLUMN "apply_status"`,
    );
    await queryRunner.query(
      `ALTER TABLE "employment_opportunity" DROP COLUMN "job_description"`,
    );
  }
}
