import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsInt, IsNumber, IsPositive, Max } from "class-validator";
import { CreateRegistrationDetailDto } from "./registration-detail/create-registration-detail.dto";

export class CreateRegistrationDto {

  @ApiProperty({
    description: 'Inscripción mediante la web',
    nullable: false,
    example: true,
  })
  @IsBoolean()
  online: boolean;

  @ApiProperty({
    description: 'Año',
    nullable: false,
    example: 2027,
  })
  @IsNumber()
  @IsPositive()
  yearNumber: number;

  @ApiProperty({
    description: 'Periodo',
    nullable: false,
    example: 1,
  })
  @IsNumber()
  @IsPositive()
  @Max(10)
  periodNumber: number;

  @ApiProperty({
    description: 'Codigo del estudiante',
    nullable: false,
    example: 220012551,
  })
  @IsNumber()
  @IsPositive()
  studentCode: number;

  @ApiProperty({
    description: 'Lista de Grupo - Materias a inscribir',
    nullable: false,
    example: [1, 2]
  })
  @IsArray()
  @IsInt({ each: true })
  subjectGroupIds: number[];
}
