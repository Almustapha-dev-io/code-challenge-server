import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BeforeInsert,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import _ from 'lodash';
import { JWT_SECRET } from '../utilities/env';
import { getHash } from '../utilities/hash';
import { generateJWT } from '../utilities/jwt';

export enum UserRole {
  FRONTEND = 0,
  DOCTOR = 1,
}

@Entity()
@Unique(['userName'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 32, name: 'user_name' })
  userName: string;

  @Column({ type: 'varchar', length: 32, name: 'first_name' })
  firstName: string;

  @Column({ type: 'varchar', length: 32, name: 'last_name' })
  lastName: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.FRONTEND })
  role: UserRole;

  @Column({ type: 'varchar', length: 200 })
  password: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ type: 'varchar', default: null })
  specialization: string;

  async generateAuthToken() {
    return await generateJWT(_.pick(this, ['id']), JWT_SECRET);
  }

  @BeforeInsert()
  async hashPassword() {
    this.password = await getHash({ s: this.password });
  }
}
