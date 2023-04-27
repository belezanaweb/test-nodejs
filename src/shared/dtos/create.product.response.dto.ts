import { ApiProperty } from "@nestjs/swagger";
import { inventoryType } from "../types/product.type";

export class CreateProductResponseDto {
    @ApiProperty()
	sku: number;

    @ApiProperty()
	name: string; 
    
    @ApiProperty()
	inventory: inventoryType;  
}