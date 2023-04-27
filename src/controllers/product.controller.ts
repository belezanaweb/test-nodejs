import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { ProductService } from "../services/product.service";
import { CreateProductDto } from "../shared/dtos/create.product.dto";
import { CreateProductResponseDto } from "../shared/dtos/create.product.response.dto";
import { UpdateProductDto } from "../shared/dtos/update.productdto";
import { apiTags } from "../shared/enums/api.tags";
import { sumary } from "../shared/enums/sumary";

@ApiTags(apiTags.PRODUCTS)
@Controller("products")
export class ProductController {
    constructor(
        private service: ProductService
    ) {}

    @Post()
    @ApiOperation({ summary: sumary.CREATE })
    @HttpCode(HttpStatus.CREATED)
    @ApiCreatedResponse({
        type: CreateProductResponseDto
    })
    @ApiBadRequestResponse({
        description: 'This will be returned when has validation error',
    })    
    public async createProduct(
        @Body() data: CreateProductDto
    ) {
        return this.service.createProduct(data)
    }

    @Get(':sku')
    @ApiOperation({ summary: sumary.LIST })
    @HttpCode(HttpStatus.OK) 
    public async findProduct(
        @Param('sku') sku: number
    ) {
        return this.service.findProduct(sku)
    }  

    @Put(':sku')
    @ApiOperation({ summary: sumary.UPDATE })
    @HttpCode(HttpStatus.OK)
    public async updateProduct(
        @Body() data: UpdateProductDto,
        @Param('sku') sku: number
    ) {
        return this.service.updateProduct(sku, data)
    }

    @Delete(':sku')
    @ApiOperation({ summary: sumary.DELETE })
    @HttpCode(HttpStatus.NO_CONTENT)
    public async deleteProduct(
        @Param('sku') sku: number
    ) {
        return this.service.deleteProduct(sku)
    }
}