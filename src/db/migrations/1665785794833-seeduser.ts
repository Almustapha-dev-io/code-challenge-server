import { MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '../../entities/User';
import { UserSeed } from '../../utilities/seedData';
import { AppDataSource } from '../data-source';

export class seeduser1665785794833 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('Seeding users');
    const usersCount = await AppDataSource.getRepository(User).count();
    if (usersCount > 0) return;
    await AppDataSource.getRepository(User).insert(UserSeed);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await AppDataSource.getRepository(User).delete({});
  }
}
