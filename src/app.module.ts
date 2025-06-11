import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { UsersController } from './users/users.controller';
import { RolesController } from './rol/rol.controller';
import { PermissionsController } from './permission/permission.controller';

import { UsersService } from './users/users.service';
import { RolesService } from './rol/rol.service';
import { PermissionsService } from './permission/permission.service';
import { JwtService } from './jwt/jwt.service';
import { AuthGuard } from './middlewares/auth.middleware';

import { UserEntity } from './entities/user.entity';
import { Role } from './entities/rol';
import { Permission } from './entities/permission';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'jwt',
      entities: [UserEntity, Role, Permission],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([UserEntity, Role, Permission]),
  ],
  controllers: [
    AppController,
    UsersController,
    RolesController,
    PermissionsController,
  ],
  providers: [
    UsersService,
    RolesService,
    PermissionsService,
    JwtService,
    AuthGuard,
  ],
})
export class AppModule {}
