import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedUserTable1717154907667 implements MigrationInterface {
    name = 'UpdatedUserTable1717154907667'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "age"`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "lastName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "password" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "age" integer NOT NULL`);
    }

}
