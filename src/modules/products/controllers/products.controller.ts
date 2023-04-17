import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { ProductsService } from "../services/products.service";
import { ProductRequest } from "../dtos/ProductRequest.dto";

@Controller("products")
export class ProductsController {
  constructor(private readonly appService: ProductsService) {}

  @Get("/:sku")
  show(@Param("sku") sku: number) {
    return this.appService.findProduct(sku);
  }

  @Post()
  create(@Body() dto: ProductRequest) {
    return this.appService.create(dto);
  }

  @Put("/:sku")
  update(@Param("sku") sku: number, @Body() dto: ProductRequest) {
    return this.appService.update(sku, dto);
  }

  @Delete("/:sku")
  delete(@Param("sku") sku: number) {
    return this.appService.delete(sku);
  }
}
