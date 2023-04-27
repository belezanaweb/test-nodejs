import { ApiProperty } from "@nestjs/swagger";
import { inventoryType } from "../../shared/types/product.type";

export class ProductEntity {
    @ApiProperty()
	sku: number;

    @ApiProperty()
	name: string; 
    
    @ApiProperty()
	inventory: inventoryType;    
}