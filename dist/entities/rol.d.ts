import { BaseEntity } from 'typeorm';
import { Permission } from './permission';
import { UserEntity } from './user.entity';
export declare class Role extends BaseEntity {
    id: number;
    name: string;
    permissions: Permission[];
    users: UserEntity[];
}
