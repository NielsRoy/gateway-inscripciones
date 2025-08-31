import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCareerDto {

  @ApiProperty({
    description: 'Codigo de la carrera',
    nullable: false,
    uniqueItems: true,
    example: '187-4',
  })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    description: 'Nombre de la carrera',
    nullable: false,
    example: 'ING. EN SISTEMAS',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
