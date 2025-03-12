import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    console.log(username, password)
    const user = await this.usersRepository.findOne({ where: { user: username } });
    console.log("user",user)
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      console.log("result", result)
      return result;
    }
    return null;
  }

  async login(username: string, pass: string) {
    const user = await this.validateUser(username, pass);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { username: user.user, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}