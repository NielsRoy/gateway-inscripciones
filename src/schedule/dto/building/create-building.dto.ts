import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class CreateBuildingDto {

  @ApiProperty({
    description: 'Número del modulo',
    nullable: false,
    example: 225,
  })
  @IsNumber()
  @IsPositive()
  number: number;

  @ApiProperty({
    description: 'Descripción del modulo',
    nullable: false,
    example: 'FACULTAD DE TECNOLOGÍA Y CIENCIAS EXACTAS',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}
