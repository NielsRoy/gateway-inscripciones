import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsPositive } from "class-validator";

export class CreateTermDto {

  @ApiProperty({
    description: 'Año',
    nullable: false,
    example: 2027,
  })
  @IsNumber()
  @IsPositive()
  year: number;
}
