import { Controller, Post, Body, Param } from '@nestjs/common';
import { RolesService } from './rol.service';
import { Permissions } from '../decorators/permissions.decorator';
import { CreateRoleDto } from '../interfaces/create-role.dto'; 

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

 
  @Post()
  @Permissions('roles_create')
  createRole(@Body() dto: CreateRoleDto) {
    return this.rolesService.create(dto.name);
  }

  @Post(':roleId/permissions')
  @Permissions('roles_assign_permissions') 
  assignPermissions(
    @Param('roleId') roleId: number,
    @Body('permissionIds') permissionIds: number[],
  ) {
    return this.rolesService.assignPermissions(roleId, permissionIds);
  }
}
