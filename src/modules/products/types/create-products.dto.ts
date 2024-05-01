export class CreateProductsDto {
  public readonly brand: string;
  public readonly description: string;
  public readonly productImage: string;
  public readonly price: number;
  public readonly ram: number;
  public readonly screenSize: string;
  public readonly userEmail: string;
  public userId: number;
}

export class ProductsData {
  brand: string;
  description: string;
  productImage: string;
  price: number;
  ram: number;
  screenSize: string;
  userId: number;
}

export class FindProductsDto {
  public readonly brand?: string[];
  public readonly minPrice?: number;
  public readonly maxPrice?: number;
  public readonly ram?: number[];
  public readonly screenSize?: string[];
  public readonly searchText?: string;
  public readonly limit?: number;
  public readonly offset?: number;
  public readonly sortOrder?: string;

}

export class DeleteProduct {
  public readonly productId: string;

}
