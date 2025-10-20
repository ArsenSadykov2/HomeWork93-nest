import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import bcrypt from 'bcrypt';
import { Document } from 'mongoose';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

export interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

export type UserDocument = User & Document & UserMethods;

const SALT_WORK_FACTOR = 10;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username: string;
  @Prop({ unique: true })
  email: string;

  @Prop({
    required: true,
    default: UserRole.USER,
    enum: UserRole,
  })
  role: UserRole;

  @Prop()
  displayName: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  token: string;

  @Prop()
  avatar: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.generateToken = function (this: User) {
  this.token = crypto.randomUUID();
};

UserSchema.methods.checkPassword = function (this: User, password: string) {
  return bcrypt.compare(password, this.password);
};

UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.set('toJSON', {
  transform: (_doc, ret: Partial<User>) => {
    delete ret.password;
    return ret;
  },
});
