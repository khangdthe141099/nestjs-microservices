import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from './users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { UsersRepository } from './users/users.repository';
import { DatabaseModule } from '@app/common';
import { UserDocument, UserSchema } from './users/model/user.schema';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from '@app/common/config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'local' }),
    DatabaseModule,
    DatabaseModule.forFeature([
      {
        name: UserDocument.name,
        schema: UserSchema,
      },
    ]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, UsersRepository, JwtStrategy],
})
export class AuthModule {}
