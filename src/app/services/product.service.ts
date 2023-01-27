import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductData} from "../type/productData";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  addProduct(data: ProductData) {
    return this.http.post("http://localhost:3000/products", data);
  }

  getProduct() {
    return this.http.get<ProductData[]>("http://localhost:3000/products");
  }

  getProductById(id: number){
    return this.http.get<ProductData>(`http://localhost:3000/products/${id}`)
  }
  updateProduct(data: ProductData) {
    return this.http.put(`http://localhost:3000/products/${data.id}`, data);
  }

  deleteProduct(id: number){
    return this.http.delete(" http://localhost:3000/products/"+ id);
  }

  getPopularProduct(){
    return this.http.get<ProductData[]>("http://localhost:3000/products?_limit=3");
  }
  getTrendyProduct(){
    return this.http.get<ProductData[]>("http://localhost:3000/products?_limit=8");
  }
  searchProduct(query: string){
    return this.http.get<ProductData[]>(`http://localhost:3000/products?q=${query}`);
  }
}
