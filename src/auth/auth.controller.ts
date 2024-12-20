import { Controller, Post, Body, Param, ParseUUIDPipe, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Patch(':id')
  updateUser(
    @Param('id', ParseUUIDPipe ) id: string, 
    @Body() updateUserDto: UpdateUserDto) {
    return this.authService.update( id, updateUserDto);
  }


}
