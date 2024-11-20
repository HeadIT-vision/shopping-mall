import { ProductBaskets } from "../model/product-baskets.model";
import { ProductConsultingProductsRegistration } from "../model/product-consulting-products-registration";

export class ProductConsultingProductsRegistrationMapper {
  public static toProductRegistration(savedBaskets: ProductBaskets[]): ProductConsultingProductsRegistration[] {
    return savedBaskets.map(savedBaskets => ({
      productId: savedBaskets.id,
      quantity: savedBaskets.quantity,
    }));
  }
}
