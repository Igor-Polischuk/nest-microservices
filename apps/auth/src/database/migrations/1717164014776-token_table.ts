import { MigrationInterface, QueryRunner } from "typeorm";

export class TokenTable1717164014776 implements MigrationInterface {
    name = 'TokenTable1717164014776'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "token_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "token" character varying NOT NULL, "userId" character varying NOT NULL, CONSTRAINT "PK_687443f2a51af49b5472e2c5ddc" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "token_entity"`);
    }

}
