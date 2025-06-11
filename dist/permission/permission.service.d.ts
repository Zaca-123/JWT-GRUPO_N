import { Permission } from '../entities/permission';
import { Repository } from 'typeorm';
export declare class PermissionsService {
    private permissionRepo;
    constructor(permissionRepo: Repository<Permission>);
    create(name: string): Promise<Permission>;
}
