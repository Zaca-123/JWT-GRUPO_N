import { RolesService } from './rol.service';
import { CreateRoleDto } from '../interfaces/create-role.dto';
export declare class RolesController {
    private readonly rolesService;
    constructor(rolesService: RolesService);
    createRole(dto: CreateRoleDto): Promise<import("../entities/rol").Role>;
    assignPermissions(roleId: number, permissionIds: number[]): Promise<import("../entities/rol").Role>;
}
