import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum BusinessType {
  ELECTRONICS = 'electronics',
  PHARMACY = 'pharmacy',
  BOOKSHOP = 'bookshop',
  GENERAL_SHOP = 'general_shop',
  HARDWARE = 'hardware',
  AGROVET = 'agrovet',
}

export enum UserRole {
  OWNER = 'owner',
  ADMIN = 'admin',
  STAFF = 'staff',
}

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: /^\S+@\S+\.\S+$/,
  })
  email: string;

  @Prop({
    type: String,
    lowercase: true,
  })
  name: string;

  @Prop({
    type: String,
    enum: UserRole,
    default: UserRole.OWNER,
  })
  role: UserRole;

  @Prop({
    type: String,
    enum: BusinessType,
    required: true,
  })
  business: BusinessType;

  @Prop({
    type: String,
    required: true,
  })
  password: string;

  @Prop({
    type: Boolean,
    default: true,
  })
  isVerified: boolean;

  @Prop({
    type: Boolean,
    default: true,
  })
  isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
