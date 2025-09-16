import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsPositive } from "class-validator";

export class CreatePrerequisiteDto {

  @ApiProperty({
    description: 'ID de una materia de algun plan de estudio',
    nullable: false,
    example: 6,
  })
  @IsNumber()
  @IsPositive()
  planSubjectId: string;

  @ApiProperty({
    description: 'ID de la materia prerequisito de algun plan de estudio',
    nullable: false,
    example: 2,
  })
  @IsNumber()
  @IsPositive()
  prerequisiteId: string;
}
