import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsPositive, Max } from "class-validator";

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
    description: 'ID del modulo',
    nullable: false,
    example: 1,
  })
  @IsNumber()
  @IsPositive()
  buildingId: number;

  @ApiProperty({
    description: 'Capacidad de ingreso de estudiantes',
    nullable: true,
    required: false,
    example: 35,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  capacity?: number;

  @ApiProperty({
    description: 'Piso',
    nullable: true,
    required: false,
    example: 1,
  })
  @IsNumber()
  @Max(300)
  @IsOptional()
  floor?: number;
}
