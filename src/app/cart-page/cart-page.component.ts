import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {cartItem, priceSummary} from "../type/productData";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit{
  constructor(private productService: ProductService, private router: Router) {
  }
  currentCartData: cartItem[] | undefined;
  priceSummary: priceSummary={
    price: 0,
    tax: 0,
    delivery: 0,
    discount: 0,
    total: 0
  }
  removeToCrt(cartId: number | undefined) {
    cartId && this.productService.userRemoveToCart(cartId).subscribe((result)=>{
      if (result) {
        this.cartDetails();
      }
    })
  }
  checkout() {
    this.router.navigate(["/checkout-page"]);
  }
  cartDetails() {
    this.productService.currentCartItem().subscribe((result)=> {
      if (result) {
        this.currentCartData = result;
        let price = 0;
        result.forEach((item)=> {
          if (item.quantity) {
            price = price + (+item.price* (+item.quantity));
          }
        });
        this.priceSummary.price = price;
        this.priceSummary.tax = price/10;
        this.priceSummary.delivery = 50;
        this.priceSummary.discount = price/10;
        this.priceSummary.total = this.priceSummary.price+this.priceSummary.tax+this.priceSummary.delivery
          -this.priceSummary.discount;

        if (!this.currentCartData.length){
          this.router.navigate(['/']);
        }
      }
    });
  }
  ngOnInit(): void {
   this.cartDetails();
  }

}
