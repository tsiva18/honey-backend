import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";


export class PhoneDto {
    
    @IsNumber()
    @IsNotEmpty()
    number: number;

    @IsNumber()
    @IsNotEmpty()
    countryCode: number;
}

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    @IsEmail()
    email: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => PhoneDto)
    phone: PhoneDto;

    @IsOptional()
    @IsString()
    profile: string;
}
