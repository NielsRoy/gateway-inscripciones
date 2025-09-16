import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateStudyPlanDto {

  @ApiProperty({
    description: 'Codigo del plan de estudio',
    nullable: false,
    uniqueItems: true,
    example: '187-4',
  })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    description: 'ID de la carrera',
    nullable: false,
    example: 1,
  })
  @IsNumber()
  @Min(0)
  careerId: number;
}
