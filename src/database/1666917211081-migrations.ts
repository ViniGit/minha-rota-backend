import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1666917211081 implements MigrationInterface {
    name = 'migrations1666917211081'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_tokens" DROP CONSTRAINT "FKUserToken"`);
        await queryRunner.query(`CREATE TABLE "route" ("id" character varying NOT NULL, "destination" character varying NOT NULL, "user_id" character varying NOT NULL, "distance" integer NOT NULL, "price" integer NOT NULL, "inactive" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_08affcd076e46415e5821acf52d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "isAdmin" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "birth_date"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "birth_date" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users_tokens" DROP CONSTRAINT "PK_9f236389174a6ccbd746f53dca8"`);
        await queryRunner.query(`ALTER TABLE "users_tokens" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "users_tokens" ADD "id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users_tokens" ADD CONSTRAINT "PK_9f236389174a6ccbd746f53dca8" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "users_tokens" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "users_tokens" ADD "user_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users_tokens" ADD CONSTRAINT "FK_32f96022cc5076fe565a5cba20b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "route" ADD CONSTRAINT "FK_797177a310ed69b8ede51c81a55" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "route" DROP CONSTRAINT "FK_797177a310ed69b8ede51c81a55"`);
        await queryRunner.query(`ALTER TABLE "users_tokens" DROP CONSTRAINT "FK_32f96022cc5076fe565a5cba20b"`);
        await queryRunner.query(`ALTER TABLE "users_tokens" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "users_tokens" ADD "user_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users_tokens" DROP CONSTRAINT "PK_9f236389174a6ccbd746f53dca8"`);
        await queryRunner.query(`ALTER TABLE "users_tokens" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "users_tokens" ADD "id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users_tokens" ADD CONSTRAINT "PK_9f236389174a6ccbd746f53dca8" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "birth_date"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "birth_date" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "isAdmin" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")`);
        await queryRunner.query(`DROP TABLE "route"`);
        await queryRunner.query(`ALTER TABLE "users_tokens" ADD CONSTRAINT "FKUserToken" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}