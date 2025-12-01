import { ApiProperty } from "@nestjs/swagger";
import { ArrayMinSize, ArrayUnique, IsArray, IsBoolean, IsInt, IsNumber, IsPositive, Max, Min } from "class-validator";

export class EnrollmentDto {

  @ApiProperty({
    description: 'Inscripción mediante la web',
    nullable: false,
    example: true,
  })
  @IsBoolean()
  online: boolean;

  @ApiProperty({
    description: 'Lista de ID de (Grupo - Materias) a inscribir',
    nullable: false,
    example: [1, 2]
  })
  @IsArray()
  @ArrayMinSize(1, { message: 'Debe inscribir al menos una materia' })
  @ArrayUnique({ message: 'No puede inscribir el mismo grupo más de una vez' })
  @IsInt({ each: true })
  subjectGroupIds: number[];
}
