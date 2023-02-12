import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {orderDetails, orderInfo} from "../type/orderInfo";
import {Router} from "@angular/router";
import {cartItem} from "../type/productData";

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit{
  constructor(private productService: ProductService, private router: Router) {
  }
  totalPrice: undefined | number;
  cartData: cartItem[] | undefined;
  orderMessage: string | undefined;

  orderNow(data: orderInfo) {
    const user = localStorage.getItem('user');
    const userId = user && JSON.parse(user).id;

    if (this.totalPrice) {
      const orderData: orderDetails = {
        ...data,
        totalPrice: this.totalPrice,
        userId: userId,
        id: undefined
      }
       this.cartData?.forEach((item)=> {
         setTimeout(()=>{
           item.id && this.productService.removeCartItems(item.id);
         },500)

       });
      this.productService.orderNow(orderData).subscribe((result)=>{
        if (result){
          this.orderMessage = "Your order has been placed";
          setTimeout(()=> {
            this.router.navigate(["/order-page"]);
            this.orderMessage = undefined;
          },3000)
        }
      })
    }
  }

  ngOnInit(): void {
    this.productService.currentCartItem().subscribe((result)=> {
      let price = 0;
      this.cartData = result;
      result.forEach((item)=> {
        if (item.quantity) {
          price = price + (+item.price* (+item.quantity))
        }
      });
      this.totalPrice = price + (price/10) + 50 - (price/10);
    });
  }

}
