import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { BusinessType } from 'src/schemas/user.schema';

export class RegisterUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsEnum(BusinessType)
  business: BusinessType;

  @IsString()
  @IsNotEmpty()
  password: string;
}
