import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class CreateStudentDto {

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
    description: 'Carnet de identidad',
    nullable: false,
    uniqueItems: true,
    example: 14183129,
  })
  @IsNumber()
  @Min(0)
  ci: number;

  @ApiProperty({
    description: 'Apellidos y nombres',
    nullable: false,
    example: 'APELLIDOS NOMBRES ESTUDIANTE 001',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Correo electronico',
    nullable: true,
    required: false,
    uniqueItems: true,
    example: 'estudiante001@gmail.com',
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: 'Número de celular',
    nullable: true,
    required: false,
    example: 73832536
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  cellphone?: number;
}
