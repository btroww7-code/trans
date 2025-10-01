import { Controller, Post, Body, Req, Res, Get, Param, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './dto'; // Create these DTO files
import { RateLimitGuard } from './rate-limit.guard'; // Assuming this is created

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @UseGuards(RateLimitGuard) // Example usage of rate limit guard
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('logout')
  async logout(@Req() req) {
    // ...logout logic...
  }

  @Post('refresh-token')
  async refreshToken(@Body() dto) {
    // ...refresh token logic...
  }

  @Post('forgot-password')
  async forgotPassword(@Body() dto) {
    // ...forgot password logic...
  }

  @Post('reset-password/:token')
  async resetPassword(@Param('token') token, @Body() dto) {
    // ...reset password logic...
  }

  @Get('verify-email/:token')
  async verifyEmail(@Param('token') token) {
    // ...verify email logic...
  }
}
