import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
  constructor(private jwtService: JwtService) {}

  async login(email: string, password: string) {
    if (email !== process.env.ADMIN_EMAIL) {
      throw new UnauthorizedException();
    }
  
    const hash = process.env.ADMIN_PASSWORD;
    if (!hash) {
      throw new Error('ADMIN_PASSWORD_HASH not set');
    }
  
    const isMatch = await bcrypt.compare(password, hash);
  
    if (!isMatch) {
      throw new UnauthorizedException();
    }
  
    const payload = { email };
  
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
