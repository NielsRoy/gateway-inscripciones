import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsPositive } from "class-validator";

export class CreateClassroomDto {

  @ApiProperty({
    description: 'Número del aula',
    nullable: false,
    example: 11,
  })
  @IsNumber()
  @IsPositive()
  number: number;

  @ApiProperty({
    description: 'Número del modulo',
    nullable: false,
    example: 225,
  })
  @IsNumber()
  @IsPositive()
  buildingNumber: number;

  @ApiProperty({
    description: 'Capacidad de ingreso de estudiantes',
    nullable: false,
    required: false,
    example: 35,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  capacity?: number;
}
