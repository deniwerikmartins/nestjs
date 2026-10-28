import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Report } from '../reports/report.entity.js'; // Mudado para import comum para a relação funcionar no TypeORM v1.x
//import {Exclude} from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' }) // <-- Tipo definido explicitamente
  email: string;

  @Column({ type: 'varchar' }) // <-- Tipo definido explicitamente
  //@Exclude()
  password: string;

  @Column({ type: 'boolean', default: true }) // <-- Tipo definido explicitamente
  admin: boolean;

  @OneToMany(() => Report, (report) => report.user) // <-- Sintaxe padrão de seta recomendada pelo TypeORM
  reports: Report[];

  @AfterInsert()
  logInsert() {
    console.log('Inserted User with id', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated User with id', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed User with id', this.id);
  }
}
