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
    description: 'ID del aula',
    nullable: false,
    example: 1,
  })
  @IsNumber()
  @IsPositive()
  classroomId: number;

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
