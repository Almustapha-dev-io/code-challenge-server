import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Diagnosis } from './Diagnosis';

@Entity()
export class Issue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  accuracy: string;

  @Column()
  icd: string;

  @Column({ name: 'icd_name' })
  icdName: string;

  @Column()
  ranking: number;

  @Column({ name: 'prof_name' })
  profName: string;

  @Column({ name: 'specialization_name' })
  specializationName: string;

  @ManyToOne(() => Diagnosis, (diagnosis) => diagnosis.issues)
  diagnosis: Diagnosis;
}
