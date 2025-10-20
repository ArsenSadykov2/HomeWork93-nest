import { Body, Controller, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { RegisterUserDTO } from './register-user.dto';

@Controller('users')
export class UsersController {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  @Post()
  registerUser(@Body() userData: RegisterUserDTO) {
    const user = new this.userModel({
      username: userData.username,
      password: userData.password,
      displayName: userData.displayName,
    });

    user.generateToken();
    return user.save();
  }
}
