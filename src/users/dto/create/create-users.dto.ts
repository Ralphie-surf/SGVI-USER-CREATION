import { IsEmail, IsNotEmpty } from "class-validator";
import { CreateBaseAbstractDto } from "src/global/create-base-abstract.dto"
import { CreateProfileDto } from "./create-profile.dto"

export class CreateUsersDto extends CreateBaseAbstractDto{
    @IsNotEmpty()
    readonly firstName: string

    @IsNotEmpty()
    readonly middleName: string

    @IsNotEmpty()
    readonly lastName: string

    @IsNotEmpty()
    readonly commonName: string

    @IsNotEmpty()
    readonly gender: string

    
    readonly dateOfBirth: Date

    
    readonly isActive: boolean;

    @IsEmail()
    @IsNotEmpty()
    readonly primaryEmailAddress: string;

   
    readonly isPrimaryEmailAddressVerified: boolean;

    
    readonly passwordSalt: string;

    
    readonly passwordHash: string;

    
    readonly isPasswordChangeRequired: boolean;

    
    readonly resetPasswordToken: string;
   
    
    readonly resetPasswordExpiration: Date;
    
    
    readonly primaryEmailVerificationToken: string;
    
    
    readonly otpEnabled: boolean
    
    
    readonly otpSecret: string
    
    
    readonly profile: CreateProfileDto
    
}