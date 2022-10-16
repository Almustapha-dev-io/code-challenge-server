import Joi from 'joi';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Issue } from './Issue';

enum DiagnosisCategory {
  VALID = 'VALID',
  INVALID = 'INVALID',
}

@Entity()
export class Diagnosis {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'patient_full_name' })
  patientFullName: string;

  @Column({ name: 'patient_gender' })
  patientGender: 'male' | 'female';

  @Column({ type: 'date', name: 'patient_date_of_birth' })
  patientDateOfBirth: Date;

  @OneToMany(() => Issue, (issue) => issue.diagnosis)
  issues: Issue[];

  @Column({
    type: 'enum',
    enum: DiagnosisCategory,
    nullable: false,
  })
  category: DiagnosisCategory;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  static validateDiagnosis(data) {
    const schema = Joi.object({
      category: Joi.string().valid('VALID', 'INVALID').required(),
      patientFullName: Joi.string().required(),
      patientGender: Joi.string().valid('male', 'female').required(),
      patientDateOfBirth: Joi.date().required(),
      issues: Joi.array()
        .items(
          Joi.object({
            name: Joi.string().required(),
            accuracy: Joi.number().required(),
            icd: Joi.string().required(),
            icdName: Joi.string().required(),
            ranking: Joi.number().required(),
            profName: Joi.string().required(),
            specializations: Joi.array().items(Joi.string()).min(1).required(),
          })
        )
        .min(1)
        .required(),
    });

    return schema.validate(data);
  }

  static validateDiagnosisForUpdate(data) {
    const schema = Joi.object({
      category: Joi.string().valid('VALID', 'INVALID'),
      patientFullName: Joi.string(),
      patientGender: Joi.string().valid('male', 'female'),
      patientDateOfBirth: Joi.date(),
    }).min(1);

    return schema.validate(data);
  }
}
