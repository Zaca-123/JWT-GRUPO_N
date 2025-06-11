import { UserI } from '../interfaces/user.interface';
import { BaseEntity } from 'typeorm';
import { Role } from './rol';
export declare class UserEntity extends BaseEntity implements UserI {
    id: number;
    email: string;
    password: string;
    roles: Role[];
    get permissionCodes(): string[];
}
