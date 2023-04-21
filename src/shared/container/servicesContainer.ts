import { container } from "tsyringe"
import { StockProductService } from "../../modules/products/service/StockProduct.service"
import { IStockProductService } from "../../modules/products/service/IStockProduct.service"

container.registerSingleton<IStockProductService>("StockProductService", StockProductService)