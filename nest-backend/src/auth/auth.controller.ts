import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Post,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/constants';
import { LoginDto } from 'src/dto/login.dto';
import { CreateUserDto } from 'src/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: LoginDto) {
    return this.authService.signIn(signInDto);
  }

  @Public()
  @Post('signup')
  SignUp(@Body() createDto: CreateUserDto){
    try{
        return this.authService.signUp(createDto)
    }catch(e){
        throw new NotFoundException(e.message);
    }
  }

  @Get('profile')
  getProfile(@Request() req) {
    return this.authService.profile(req.user.email);
  }
}
