import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateSubjectDto {

  @ApiProperty({
    description: 'Codigo de la materia',
    nullable: false,
    uniqueItems: true,
    example: 'INF777',
  })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    description: 'Nombre de la materia',
    nullable: false,
    example: 'MICROSERVICIOS',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
