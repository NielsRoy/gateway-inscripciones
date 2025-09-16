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
    description: 'ID del estudiante',
    nullable: false,
    example: 1,
  })
  @IsNumber()
  @IsPositive()
  studentId: number;

  @ApiProperty({
    description: 'ID de materia inscrita',
    nullable: false,
    example: 1,
  })
  @IsNumber()
  @IsPositive()
  registrationDetailId: number;

  // @ApiProperty({
  //   description: 'ID del grupo - materia',
  //   nullable: false,
  //   example: 1,
  // })
  // @IsNumber()
  // @IsPositive()
  // subjectGroupId: number;
}