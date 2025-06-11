import { BaseEntity } from 'typeorm';
import { Role } from './rol';
export declare class Permission extends BaseEntity {
    id: number;
    name: string;
    roles: Role[];
}
