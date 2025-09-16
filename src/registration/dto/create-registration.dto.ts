import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsInt, IsNumber, IsPositive, Max, Min } from "class-validator";
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
    description: 'ID del Periodo',
    nullable: false,
    example: 1,
  })
  @IsNumber()
  @IsPositive()
  @Min(1)
  periodId: number;

  @ApiProperty({
    description: 'Id del estudiante',
    nullable: false,
    example: 1,
  })
  @IsNumber()
  @IsPositive()
  studentId: number;

  // @ApiProperty({
  //   description: 'Lista de ID de (Grupo - Materias) a inscribir',
  //   nullable: false,
  //   example: [1, 2]
  // })
  // @IsArray()
  // @IsInt({ each: true })
  // subjectGroupIds: number[];
}
