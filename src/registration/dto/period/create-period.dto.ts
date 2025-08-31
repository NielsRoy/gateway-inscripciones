import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsPositive } from "class-validator";

export class CreatePeriodDto {

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
  number: number;
}
