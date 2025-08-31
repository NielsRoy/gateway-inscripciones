import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsPositive, IsString, Max } from "class-validator";

export class CreateLevelDto {

  @ApiProperty({
    description: 'Número del nivel',
    nullable: false,
    example: 1,
  })
  @IsNumber()
  @IsPositive()
  @Max(10)
  number: number;

  @ApiProperty({
    description: 'Codigo del plan de estudio',
    nullable: false,
    example: '187-4',
  })
  @IsString()
  @IsNotEmpty()
  studyPlanCode: string;
}
