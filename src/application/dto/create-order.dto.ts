import { IsString, IsArray, IsNumber, Min } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  userId: string;

  @IsArray()
  items: Array<{ productId: string; quantity: number }>;

  @IsNumber()
  @Min(0)
  total: number;
}
