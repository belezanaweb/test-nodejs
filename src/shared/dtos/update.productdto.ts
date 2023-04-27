import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsObject, IsString } from "class-validator";
import { inventoryType } from "../types/product.type";

export class UpdateProductDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
	name: string; 
    
    @ApiProperty()
    @IsObject()
    @IsNotEmpty()
	inventory: inventoryType;  
}