import { Controller, Post, Body } from '@nestjs/common';
import { PermissionsService } from './permission.service';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  create(@Body('name') name: string) {
    return this.permissionsService.create(name);
  }
}
