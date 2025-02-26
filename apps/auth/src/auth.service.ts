import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from './users/users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async generateTokens(userId: string) {
    const payload = { sub: userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateJwtUser(userId: string) {
    const user = await this.usersRepository.findOne({ _id: userId });
    if (!user) throw new UnauthorizedException('User not found!');
    return user;
  }

  async validateUser(username: string, pass: string) {
    const user = await this.usersRepository.findOne({ username });
    if (!user) throw new UnauthorizedException('User not register!');

    const isValid = await bcrypt.compare(pass, user.password);
    if (!isValid) throw new UnauthorizedException('Password not match');
    const { password, ...result } = user;
    return result;
  }

  async login(userId: string) {
    const { access_token } = await this.generateTokens(userId);
    return {
      id: userId,
      access_token,
    };
  }
}
