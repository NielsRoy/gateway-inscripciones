import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsPositive, IsString, Length } from "class-validator";

export class CreateGroupScheduleDto {

  @ApiProperty({
    description: 'ID del horario',
    nullable: false,
    example: 1,
  })
  @IsNumber()
  @IsPositive()
  scheduleId: number;

  @ApiProperty({
    description: 'Número del aula',
    nullable: false,
    example: 11,
  })
  @IsNumber()
  @IsPositive()
  classroomNumber: number;

  @ApiProperty({
    description: 'Número del modulo',
    nullable: false,
    example: 225,
  })
  @IsNumber()
  @IsPositive()
  buildingNumber: number;

  @ApiProperty({
    description: 'ID del día de la semana',
    nullable: false,
    example: 1,
  })
  @IsNumber()
  @IsPositive()
  dayId: number;

  @ApiProperty({
    description: 'ID del Grupo - Materia',
    nullable: false,
    example: 1,
  })
  @IsNumber()
  @IsPositive()
  subjectGroupId: number;
}
