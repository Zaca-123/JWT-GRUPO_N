"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const users_controller_1 = require("./users/users.controller");
const rol_controller_1 = require("./rol/rol.controller");
const permission_controller_1 = require("./permission/permission.controller");
const users_service_1 = require("./users/users.service");
const rol_service_1 = require("./rol/rol.service");
const permission_service_1 = require("./permission/permission.service");
const jwt_service_1 = require("./jwt/jwt.service");
const auth_middleware_1 = require("./middlewares/auth.middleware");
const user_entity_1 = require("./entities/user.entity");
const rol_1 = require("./entities/rol");
const permission_1 = require("./entities/permission");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: 'root',
                database: 'jwt',
                entities: [user_entity_1.UserEntity, rol_1.Role, permission_1.Permission],
                synchronize: true,
            }),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity, rol_1.Role, permission_1.Permission]),
        ],
        controllers: [
            app_controller_1.AppController,
            users_controller_1.UsersController,
            rol_controller_1.RolesController,
            permission_controller_1.PermissionsController,
        ],
        providers: [
            users_service_1.UsersService,
            rol_service_1.RolesService,
            permission_service_1.PermissionsService,
            jwt_service_1.JwtService,
            auth_middleware_1.AuthGuard,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map