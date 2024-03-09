import * as bcrypt from 'bcrypt';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column({
    unique: true,
    type: 'text',
  })
  email: string;

  @Column('text')
  password: string;

  @BeforeInsert()
  hashPassword() {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(this.password, salt);
    this.password = hashedPassword;
  }

  comparePassword(attempt: string) {
    return bcrypt.compareSync(attempt, this.password);
  }
}
