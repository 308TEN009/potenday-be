import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDefaultTables1691412411541 implements MigrationInterface {
  name = 'InitDefaultTables1691412411541';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "email_verification" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" character varying(255) NOT NULL, "expired_in" TIMESTAMP WITH TIME ZONE NOT NULL, "is_verified" boolean NOT NULL DEFAULT false, "user_id" uuid NOT NULL, CONSTRAINT "email_verification_pk_idx" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "user_verify_code_idx" ON "email_verification" ("user_id", "code") `,
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
      `CREATE TABLE "user" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" character varying(30) NOT NULL, "password" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "phone_number" character varying(20) NOT NULL, CONSTRAINT "UQ_758b8ce7c18b9d347461b30228d" UNIQUE ("user_id"), CONSTRAINT "user_pk_idx" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "email_verification" ADD CONSTRAINT "FK_e7eb5e3c3dd984d69f6eb1cdf1c" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "refresh_token" ADD CONSTRAINT "FK_6bbe63d2fe75e7f0ba1710351d4" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "social_account" ADD CONSTRAINT "FK_365d4084b1feb693468d6248411" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "social_account" DROP CONSTRAINT "FK_365d4084b1feb693468d6248411"`,
    );
    await queryRunner.query(
      `ALTER TABLE "refresh_token" DROP CONSTRAINT "FK_6bbe63d2fe75e7f0ba1710351d4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "email_verification" DROP CONSTRAINT "FK_e7eb5e3c3dd984d69f6eb1cdf1c"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP INDEX "public"."social_account_idx"`);
    await queryRunner.query(`DROP TABLE "social_account"`);
    await queryRunner.query(`DROP INDEX "public"."user_fk_idx"`);
    await queryRunner.query(`DROP TABLE "refresh_token"`);
    await queryRunner.query(`DROP INDEX "public"."user_verify_code_idx"`);
    await queryRunner.query(`DROP TABLE "email_verification"`);
  }
}
