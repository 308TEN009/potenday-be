import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDefaultTables1691634341779 implements MigrationInterface {
  name = 'InitDefaultTables1691634341779';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "personal_statement" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "question" character varying(255) NOT NULL, "answer" text NOT NULL, "employment_opportunity_id" uuid NOT NULL, CONSTRAINT "personal_statement_pk_idx" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "employment_opportunity_fk_idx" ON "personal_statement" ("employment_opportunity_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "employment_opportunity" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "company_name" character varying(255) NOT NULL, "application_job" character varying(255) NOT NULL, "status" character varying(20) NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "employment_opportunity_pk_idx" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "employment_opportunity_user_fk_idx" ON "employment_opportunity" ("user_id") `,
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
      `CREATE TABLE "news" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(255) NOT NULL, "content" text NOT NULL, "url" character varying(255) NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "news_pk_idx" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "news_user_fk_idx" ON "news" ("user_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "refresh_token" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "expired_in" TIMESTAMP WITH TIME ZONE NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "refresh_pk_idx" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "user_fk_idx" ON "refresh_token" ("user_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "social_account" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "social_id" character varying(255) NOT NULL, "type" character varying(255) NOT NULL, "access_token" character varying(255) NOT NULL, "refresh_token" character varying(255), "user_id" uuid NOT NULL, CONSTRAINT "social_account_pk_idx" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "social_account_idx" ON "social_account" ("type", "social_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" character varying(120) NOT NULL, "password" character varying(255) NOT NULL, "email" character varying(255), "phone_number" character varying(20), CONSTRAINT "UQ_758b8ce7c18b9d347461b30228d" UNIQUE ("user_id"), CONSTRAINT "user_pk_idx" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "bookmark_site" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "url" character varying(255) NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "bookmark_site_pk_idx" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "bookmark_site_user_fk_idx" ON "bookmark_site" ("user_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "personal_statement" ADD CONSTRAINT "FK_89e1896b19da842b786f4c678a4" FOREIGN KEY ("employment_opportunity_id") REFERENCES "employment_opportunity"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "employment_opportunity" ADD CONSTRAINT "FK_d0d3fb9e0235a4e6b2a133707f0" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "experience_detail" ADD CONSTRAINT "FK_97ee7be8ec52a8f353cb743094e" FOREIGN KEY ("experience_id") REFERENCES "experience"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "experience" ADD CONSTRAINT "FK_62c0623650986849f3fc1d148e7" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "news" ADD CONSTRAINT "FK_7a806f5e14fced276888eab1a3e" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "refresh_token" ADD CONSTRAINT "FK_6bbe63d2fe75e7f0ba1710351d4" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "social_account" ADD CONSTRAINT "FK_365d4084b1feb693468d6248411" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookmark_site" ADD CONSTRAINT "FK_6c22d9c81e71cd46d1a499ebe68" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "bookmark_site" DROP CONSTRAINT "FK_6c22d9c81e71cd46d1a499ebe68"`,
    );
    await queryRunner.query(
      `ALTER TABLE "social_account" DROP CONSTRAINT "FK_365d4084b1feb693468d6248411"`,
    );
    await queryRunner.query(
      `ALTER TABLE "refresh_token" DROP CONSTRAINT "FK_6bbe63d2fe75e7f0ba1710351d4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "news" DROP CONSTRAINT "FK_7a806f5e14fced276888eab1a3e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "experience" DROP CONSTRAINT "FK_62c0623650986849f3fc1d148e7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "experience_detail" DROP CONSTRAINT "FK_97ee7be8ec52a8f353cb743094e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "employment_opportunity" DROP CONSTRAINT "FK_d0d3fb9e0235a4e6b2a133707f0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "personal_statement" DROP CONSTRAINT "FK_89e1896b19da842b786f4c678a4"`,
    );
    await queryRunner.query(`DROP INDEX "public"."bookmark_site_user_fk_idx"`);
    await queryRunner.query(`DROP TABLE "bookmark_site"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP INDEX "public"."social_account_idx"`);
    await queryRunner.query(`DROP TABLE "social_account"`);
    await queryRunner.query(`DROP INDEX "public"."user_fk_idx"`);
    await queryRunner.query(`DROP TABLE "refresh_token"`);
    await queryRunner.query(`DROP INDEX "public"."news_user_fk_idx"`);
    await queryRunner.query(`DROP TABLE "news"`);
    await queryRunner.query(`DROP INDEX "public"."experience_user_fk_idx"`);
    await queryRunner.query(`DROP TABLE "experience"`);
    await queryRunner.query(
      `DROP INDEX "public"."experience_detail_experience_fk_idx"`,
    );
    await queryRunner.query(`DROP TABLE "experience_detail"`);
    await queryRunner.query(
      `DROP INDEX "public"."employment_opportunity_user_fk_idx"`,
    );
    await queryRunner.query(`DROP TABLE "employment_opportunity"`);
    await queryRunner.query(
      `DROP INDEX "public"."employment_opportunity_fk_idx"`,
    );
    await queryRunner.query(`DROP TABLE "personal_statement"`);
  }
}
