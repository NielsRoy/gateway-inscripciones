import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsPositive, Max, Min } from "class-validator";

export class CreateGradeDto {

  @ApiProperty({
    description: 'Calificación númerica (0 - 100)',
    nullable: false,
    example: 100,
  })
  @IsNumber()
  @Min(0)
  @Max(100)
  number: number;

  @ApiProperty({
    description: 'Codigo de registro del estudiante',
    nullable: false,
    example: 220014551,
  })
  @IsNumber()
  @Min(0)
  studentCode: number;

  @ApiProperty({
    description: 'ID de inscripción',
    nullable: false,
    example: 1,
  })
  @IsNumber()
  @IsPositive()
  registrationId: number;

  @ApiProperty({
    description: 'ID del grupo - materia',
    nullable: false,
    example: 1,
  })
  @IsNumber()
  @IsPositive()
  subjectGroupId: number;
}