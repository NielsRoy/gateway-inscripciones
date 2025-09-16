import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsPositive } from "class-validator";

export class CreatePeriodDto {

  @ApiProperty({
    description: 'ID de la gestión',
    nullable: false,
    example: 1,
  })
  @IsNumber()
  @IsPositive()
  termId: number;

  @ApiProperty({
    description: 'Periodo',
    nullable: false,
    example: 1,
  })
  @IsNumber()
  @IsPositive()
  number: number;
}
