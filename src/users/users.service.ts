import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LoginDTO } from 'src/interfaces/login.dto';
import { RegisterDTO } from 'src/interfaces/register.dto';
import { UserI } from 'src/interfaces/user.interface';

import { UserEntity } from '../entities/user.entity';
import { Role } from '../entities/rol';

import { hashSync, compareSync } from 'bcrypt';
import { JwtService } from 'src/jwt/jwt.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,

    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,

    private readonly jwtService: JwtService
  ) {}

  async refreshToken(refreshToken: string) {
    return this.jwtService.refreshToken(refreshToken);
  }

  canDo(user: UserI, permission: string): boolean {
    const result = user.permissionCodes.includes(permission);
    if (!result) {
      throw new UnauthorizedException();
    }
    return true;
  }

  async register(body: RegisterDTO) {
    try {
      const user = new UserEntity();
      Object.assign(user, body);
      user.password = hashSync(user.password, 10);
      await this.userRepo.save(user);
      return { status: 'created' };
    } catch (error) {
      throw new HttpException('Error de creacion', 500);
    }
  }

  async login(body: LoginDTO) {
    const user = await this.userRepo.findOne({
      where: { email: body.email },
      relations: ['roles', 'roles.permissions'],
    });

    if (!user) throw new UnauthorizedException();
    if (!compareSync(body.password, user.password)) {
      throw new UnauthorizedException();
    }

    const permissionCodes = user.roles
      .flatMap((role) => role.permissions || [])
      .map((p) => p.name);

    return {
      accessToken: this.jwtService.generateToken(
        { email: user.email },
        'auth'
      ),
      refreshToken: this.jwtService.generateToken(
      { email: user.email },
      'refresh'
      ),
    };
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return await this.userRepo.findOneBy({ email });
  }

  async assignRole(userId: number, roleId: number) {
    const user = await this.userRepo.findOne({
      where: { id: userId },
      relations: ['roles'],
    });
    const role = await this.roleRepo.findOneBy({ id: roleId });

    if (!user || !role) {
      throw new HttpException('Usuario o rol no encontrado', 404);
    }

    user.roles.push(role);
    return this.userRepo.save(user);
  }
}
