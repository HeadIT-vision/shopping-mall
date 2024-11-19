import { ProductConsultingProductsRegistration } from "../model/product-consulting-products-registration";
import { ProductConsultingRegistration } from "../model/product-consulting-registration";
import { ProductConsulting } from "../model/product-consulting.model";

export class ProductConsultingRegistrationMapper {
  public static toProductRegistration(productsConsulting: ProductConsulting[]): ProductConsultingRegistration[] {
    return productsConsulting.map(consulting => ({
      title: consulting.content || '',
      name: consulting.name.trim(),
      phoneNumber: consulting.phoneNumber.toString(),
      email: consulting.email,
      businessType: consulting.businessType ? 1 : 0,
      businessName: consulting.businessName,
      content: consulting.content || '',
      products: consulting.products.map(product => ({
        productId: product.id,
        quantity: product.quantity
      })) as ProductConsultingProductsRegistration[]
    }));
  }
}
