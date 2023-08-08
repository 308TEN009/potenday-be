import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDomains1691505361513 implements MigrationInterface {
  name = 'AddDomains1691505361513';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "personal_statement" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "question" character varying(255) NOT NULL, "answer" text NOT NULL, "employment_opportunity_id" uuid NOT NULL, CONSTRAINT "personal_statement_pk_idx" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "employment_opportunity_fk_idx" ON "personal_statement" ("employment_opportunity_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "bookmark_site" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "url" character varying(255) NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "bookmark_site_pk_idx" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "bookmark_site_user_fk_idx" ON "bookmark_site" ("user_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "experience_detail" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" text NOT NULL, "experience_id" uuid NOT NULL, CONSTRAINT "experience_detail_pk_idx" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "experience_detail_experience_fk_idx" ON "experience_detail" ("experience_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "experience" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "experience_pk_idx" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "experience_user_fk_idx" ON "experience" ("user_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "employment_opportunity" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "company_name" character varying(255) NOT NULL, "application_job" character varying(255) NOT NULL, "status" character varying(20) NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "employment_opportunity_pk_idx" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "employment_opportunity_user_fk_idx" ON "employment_opportunity" ("user_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "personal_statement" ADD CONSTRAINT "FK_89e1896b19da842b786f4c678a4" FOREIGN KEY ("employment_opportunity_id") REFERENCES "employment_opportunity"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookmark_site" ADD CONSTRAINT "FK_6c22d9c81e71cd46d1a499ebe68" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "experience_detail" ADD CONSTRAINT "FK_97ee7be8ec52a8f353cb743094e" FOREIGN KEY ("experience_id") REFERENCES "experience"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "experience" ADD CONSTRAINT "FK_62c0623650986849f3fc1d148e7" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "employment_opportunity" ADD CONSTRAINT "FK_d0d3fb9e0235a4e6b2a133707f0" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "employment_opportunity" DROP CONSTRAINT "FK_d0d3fb9e0235a4e6b2a133707f0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "experience" DROP CONSTRAINT "FK_62c0623650986849f3fc1d148e7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "experience_detail" DROP CONSTRAINT "FK_97ee7be8ec52a8f353cb743094e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookmark_site" DROP CONSTRAINT "FK_6c22d9c81e71cd46d1a499ebe68"`,
    );
    await queryRunner.query(
      `ALTER TABLE "personal_statement" DROP CONSTRAINT "FK_89e1896b19da842b786f4c678a4"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."employment_opportunity_user_fk_idx"`,
    );
    await queryRunner.query(`DROP TABLE "employment_opportunity"`);
    await queryRunner.query(`DROP INDEX "public"."experience_user_fk_idx"`);
    await queryRunner.query(`DROP TABLE "experience"`);
    await queryRunner.query(
      `DROP INDEX "public"."experience_detail_experience_fk_idx"`,
    );
    await queryRunner.query(`DROP TABLE "experience_detail"`);
    await queryRunner.query(`DROP INDEX "public"."bookmark_site_user_fk_idx"`);
    await queryRunner.query(`DROP TABLE "bookmark_site"`);
    await queryRunner.query(
      `DROP INDEX "public"."employment_opportunity_fk_idx"`,
    );
    await queryRunner.query(`DROP TABLE "personal_statement"`);
  }
}
