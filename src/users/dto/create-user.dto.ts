import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Phone } from "../entities/user.entity";
import { Type } from "class-transformer";

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    @IsEmail()
    email: string;

    @IsOptional()
    @Type(() => Phone)
    phone: Phone;

    @IsOptional()
    @IsString()
    profile: string;
}
