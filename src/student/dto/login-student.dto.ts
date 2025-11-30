import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, Min, MinLength } from "class-validator";

export class LoginStudentDto {

  @ApiProperty({
    description: 'Codigo de registro',
    nullable: false,
    uniqueItems: true,
    example: 220014551,
  })
  @IsNumber()
  @Min(0)
  code: number;

  @ApiProperty({
    description: 'Contraseña',
    nullable: false,
    uniqueItems: false,
    example: 123456,
  })
  @IsString()
  @MinLength(6)
  password: string;
}
