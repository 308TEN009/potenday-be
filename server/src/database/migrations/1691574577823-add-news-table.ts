import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNewsTable1691574577823 implements MigrationInterface {
  name = 'AddNewsTable1691574577823';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "news" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(255) NOT NULL, "content" text NOT NULL, "url" character varying(255) NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "news_pk_idx" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "news_user_fk_idx" ON "news" ("user_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "news" ADD CONSTRAINT "FK_7a806f5e14fced276888eab1a3e" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "news" DROP CONSTRAINT "FK_7a806f5e14fced276888eab1a3e"`,
    );
    await queryRunner.query(`DROP INDEX "public"."news_user_fk_idx"`);
    await queryRunner.query(`DROP TABLE "news"`);
  }
}
