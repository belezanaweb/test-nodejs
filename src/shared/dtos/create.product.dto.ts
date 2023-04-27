import { ApiProperty } from "@nestjs/swagger";
import { inventoryType } from "../types/product.type";
import { IsNotEmpty, IsNumber, IsObject, IsString, Min } from "class-validator";

export class CreateProductDto {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    @Min(1)
	sku: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
	name: string; 
    
    @ApiProperty()
    @IsObject()
    @IsNotEmpty()
	inventory: inventoryType;  
}