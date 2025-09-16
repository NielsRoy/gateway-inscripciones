import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Max } from "class-validator";

export class CreatePlanSubjectDto {

  @ApiProperty({
    description: 'Creditos de la materia',
    nullable: false,
    example: 4,
  })
  @IsNumber()
  @IsPositive()
  @Max(10)
  credits: number;

  @ApiProperty({
    description: 'Materia electiva',
    nullable: false,
    required: false,
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  isOptional: boolean;

  @ApiProperty({
    description: 'ID de la materia',
    nullable: false,
    example: 4,
  })
  @IsNumber()
  @IsPositive()
  subjectId: string;

  @ApiProperty({
    description: 'Nivel en el plan de estudio',
    nullable: false,
    example: 1,
  })
  @IsNumber()
  @IsPositive()
  @Max(10)
  levelNumber: number;

  @ApiProperty({
    description: 'ID del plan de estudio',
    nullable: false,
    example: 1,
  })
  @IsNumber()
  @IsPositive()
  studyPlanId: number;
}
