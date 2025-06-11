import { Role } from '../entities/rol';
import { Repository } from 'typeorm';
import { Permission } from '../entities/permission';
export declare class RolesService {
    private roleRepo;
    private permissionRepo;
    constructor(roleRepo: Repository<Role>, permissionRepo: Repository<Permission>);
    create(name: string): Promise<Role>;
    assignPermissions(roleId: number, permissionIds: number[]): Promise<Role>;
}
