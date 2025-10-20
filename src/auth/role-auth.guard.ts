import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { User, UserDocument, UserRole } from '../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export interface RequestWithUser extends Request {
  user: UserDocument;
}

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<RequestWithUser>();

    const token = req.get('Authorization');
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    const user = await this.userModel.findOne({ token });

    if (!user || user.role !== UserRole.ADMIN) {
      throw new UnauthorizedException('forbidden for not admin users');
    }

    req.user = user;
    return true;
  }
}
