import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne
} from 'typeorm';
import type {User} from '../users/user.entity.js';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'boolean', default: false })
  approved: boolean;

  @Column({ type: 'float' }) // <-- Defina explicitamente como 'float' ou 'int'
  price: number;

  @Column({ type: 'varchar' }) // <-- Defina explicitamente como 'varchar' ou 'text'
  make: string;

  @Column({ type: 'varchar' })
  model: string;

  @Column({ type: 'int' })
  year: number;

  @Column({ type: 'float' })
  lng: number;

  @Column({ type: 'float' })
  lat: number;

  @Column({ type: 'int' })
  mileage: number;

  @ManyToOne('User', (user: User) => user.reports)
  user: User;
}