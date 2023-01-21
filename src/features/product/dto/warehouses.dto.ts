import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class WarehousesDto {
  @ApiProperty({
    type: 'string',
    description: 'Product locality.',
  })
  @IsString()
  @IsNotEmpty()
  public locality: string;

  @ApiProperty({
    type: 'number',
    description: 'Product quantity.',
  })
  @IsNotEmpty()
  @IsNumber()
  public quantity: number;

  @ApiProperty({
    type: 'string',
    description: 'Product type.',
  })
  @IsNotEmpty()
  @IsNumber()
  public type: string;
}
