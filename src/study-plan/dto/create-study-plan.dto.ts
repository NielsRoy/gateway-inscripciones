import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateStudyPlanDto {

  @ApiProperty({
    description: 'Codigo del plan de estudio',
    nullable: false,
    uniqueItems: true,
    example: '187-3',
  })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    description: 'Codigo de la carrera',
    nullable: false,
    example: '187-3',
  })
  @IsString()
  @IsNotEmpty()
  careerCode: string;
}
