import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {

  @ApiProperty({
    default: 10,
    description: 'How many elements do you need'
  })
  @IsOptional()
  @IsPositive()
  @Type( () => Number ) // enableImplicitConversions: true 
  limit?: number = 10;

  @ApiProperty({
    default: 1,
    description: 'Which page do you want to see'
  })
  @IsOptional()
  @Min(1)
  @Type( () => Number ) //? Automaticamente convierte "2" a 2 osea a tipo number
  pag?: number = 1;

  @ApiProperty({
    default: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  async: boolean = true; 
}