import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsPositive, IsString, Length } from "class-validator";

export class CreateSubjectGroupDto {

  @ApiProperty({
    description: 'Grupo de la materia',
    nullable: false,
    example: 'SA',
  })
  @IsString()
  @Length(2)
  group: string;

  @ApiProperty({
    description: 'ID del docente',
    nullable: false,
    example: 1,
  })
  @IsNumber()
  @IsPositive()
  teacherId: number;

  @ApiProperty({
    description: 'ID de materia - plan de estudio',
    nullable: false,
    example: 1,
  })
  @IsNumber()
  @IsPositive()
  planSubjectId: number;
}
