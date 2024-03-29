import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {cartItem, ProductData} from "../type/productData";
import {orderDetails} from "../type/orderInfo";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  cartDetails = new EventEmitter<ProductData[] | []>();

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
  addToCart(data : ProductData) {
    let cartData = [];
    const localCartData = localStorage.getItem('cartData');
    if (!localCartData) {
      localStorage.setItem('cartData', JSON.stringify([data]));
      this.cartDetails.emit([data]);
    } else {
      cartData = JSON.parse(localCartData);
      cartData.push(data);
      localStorage.setItem('cartData', JSON.stringify(cartData));
    }
    this.cartDetails.emit(cartData);
  }
  removeFromCarts(productId: number) {
    const cartData = localStorage.getItem('cartData');
    if (cartData) {
      let items: ProductData[] = JSON.parse(cartData);
      items = items.filter((item: ProductData)=> productId !== item.id);
      localStorage.setItem('cartData', JSON.stringify(items));
      this.cartDetails.emit(items);
    }
  }
  userAddToCart(data: cartItem) {
    return this.http.post("http://localhost:3000/cart", data);
  }

  getCartList(userId: number){
    return this.http.get<ProductData[]>("http://localhost:3000/cart?userId=" +userId,
      {observe: "response"}).subscribe((result)=>{
        if (result && result.body){
          this.cartDetails.emit(result.body);
        }
    });
  }
  userRemoveToCart(cartId: number) {
    return this.http.delete("http://localhost:3000/cart/"+cartId);
  }
  currentCartItem() {
    const userStore = localStorage.getItem('user');
    const userData = userStore && JSON.parse(userStore);
    return this.http.get<cartItem[]>("http://localhost:3000/cart?userId="+userData.id);
  }
  orderNow(data: orderDetails){
    return this.http.post("http://localhost:3000/orders", data);
  }
  orderLists() {
    const userStore = localStorage.getItem('user');
    const userData = userStore && JSON.parse(userStore);
    return this.http.get<orderDetails[]>("http://localhost:3000/orders?userId="+userData.id);
  }
  removeCartItems(cartId: number) {
    return this.http.delete("http://localhost:3000/cart/"+cartId, {observe:"response"}).subscribe((result)=>{
      if (result) {
        this.cartDetails.emit([]);
      }
    })
  }
  cancelOrder(orderId: number) {
    return this.http.delete("http://localhost:3000/orders/"+ orderId);
  }
}
