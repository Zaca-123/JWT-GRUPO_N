import { UserI } from '../interfaces/user.interface';
import { BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn,ManyToMany,JoinTable } from 'typeorm';
import { Role } from './rol';

@Entity('user')
export class UserEntity extends BaseEntity implements UserI {
  @PrimaryGeneratedColumn()
  id: number;
  @Index({unique:true})
  @Column()
  email: string;
  @Column()
  password: string;

  @ManyToMany(() => Role, rol => rol.users)
  @JoinTable()
  roles: Role[];

  get permissionCodes() {
    return ['create-users', 'list-products'];
  }
}
