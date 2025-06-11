import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../entities/rol';
import { Repository } from 'typeorm';
import { Permission } from '../entities/permission';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepo: Repository<Role>,
    @InjectRepository(Permission)
    private permissionRepo: Repository<Permission>,
  ) {}

  async create(name: string) {
    const role = this.roleRepo.create({ name });
    return this.roleRepo.save(role);
  }

  async assignPermissions(roleId: number, permissionIds: number[]) {
    const role = await this.roleRepo.findOne({ where: { id: roleId }, relations: ['permissions'] });
    const permissions = await this.permissionRepo.findByIds(permissionIds);
    role.permissions = [...role.permissions, ...permissions];
    return this.roleRepo.save(role);
  }
}
