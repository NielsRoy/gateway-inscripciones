import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsTimeZone } from "class-validator";

export class CreateScheduleDto {

  @ApiProperty({
    description: 'Hora de inicio',
    nullable: false,
    example: '13:00',
  })
  @IsTimeZone()
  @IsNotEmpty()
  beginTime: string;

  @ApiProperty({
    description: 'Hora de fin',
    nullable: false,
    example: '14:00',
  })
  @IsTimeZone()
  @IsNotEmpty()
  endTime: string;
}
