import { PermissionsService } from './permission.service';
export declare class PermissionsController {
    private readonly permissionsService;
    constructor(permissionsService: PermissionsService);
    create(name: string): Promise<import("../entities/permission").Permission>;
}
