import { RolesGuard } from './../common/guards/roles.guard';
import { JwtAuthGuard } from './../common/guards/jwt-auth.guard';
import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('login')
  login(@Body() body: { email: string; password: string }) {
    return this.adminService.login(body.email, body.password);
  }

  @UseGuards(JwtAuthGuard, RolesGuard) //로깅 추가, 인증 실패 메시지 커스터마이징, whitelist 예외 처리, GraphQL 대응
  @Get('me')
  me(@Req() req: any) {
    return req.user; // JwtStrategy validate()가 리턴한 값이 들어옴
  }
}