import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {cartItem, ProductData} from "../type/productData";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  constructor(private productService: ProductService) {
  }

  popularProductLists: undefined| ProductData[];
  trendyProductLists: undefined| ProductData[];
  productDetails: undefined | ProductData;
  productQuantity = 1;

  addTrendyItemToCart(id: number) {
    this.productService.getProductById(id).subscribe((result) => {
      this.productDetails = result;
      if (this.productDetails) {
        this.productDetails.quantity = this.productQuantity;
        if (!localStorage.getItem('user')) {
          this.productService.addToCart(this.productDetails)
        } else {
          const user = localStorage.getItem('user');
          const userId = user && JSON.parse(user).id;
          const cartData: cartItem = {
            ...this.productDetails,
            userId,
            productId: this.productDetails.id
          }
          //delete cartData.id;
          this.productService.userAddToCart(cartData).subscribe((result)=> {
            if (result) {
              this.productService.getCartList(userId);
            }
          })
        }
      }
    });
  }

  ngOnInit(): void {
    this.productService.getPopularProduct().subscribe((data)=> {
      if (data) {
        this.popularProductLists = data;
      }
    });

    this.productService.getTrendyProduct().subscribe((data)=> {
      if(data) {
        this.trendyProductLists = data;
      }
    })
  }
}
