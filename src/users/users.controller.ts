import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { RegisterUserDTO } from './register-user.dto';
import { LoginUserDto } from './login-user.dto';
import { AuthService } from '../auth/auth.service';

@Controller('users')
export class UsersController {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private authService: AuthService,
  ) {}

  @Post()
  registerUser(@Body() userData: RegisterUserDTO) {
    const user = new this.userModel({
      username: userData.username,
      email: userData.email,
      displayName: userData.displayName,
      password: userData.password,
    });

    user.generateToken();
    return user.save();
  }
  @Post('sessions')
  async login(@Body() userData: LoginUserDto) {
    const { username, password } = userData;
    const user = await this.authService.validateUser(username, password);

    if (!user) {
      throw new UnauthorizedException('Неверный логин или пароль');
    }

    return {
      user: {
        _id: user._id,
        username: user.username,
        displayName: '',
        email: '',
      },
      token: user.token,
    };
  }

  @Delete(':id')
  logout(@Param('id') id: string) {
    return this.userModel.deleteOne({ _id: id });
  }
}
