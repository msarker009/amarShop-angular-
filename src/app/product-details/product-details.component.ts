import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../services/product.service";
import {cartItem, ProductData} from "../type/productData";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  constructor(private activeRoute: ActivatedRoute, private productService: ProductService) {
  }

  productDetails: undefined | ProductData;
  productQuantity = 1;
  removeCart = false;
  cartData: undefined | ProductData;

  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val === "max") {
      this.productQuantity += 1;
    } else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity -= 1;
    }
  }

  addToCart() {
    if (this.productDetails) {
      this.productDetails.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        this.productService.addToCart(this.productDetails)
        this.removeCart = true
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
           this.removeCart = true;
          }
        })
      }
    }
  }
  removeFromCart(id: number) {
    if (!localStorage.getItem("user")) {
      this.productService.removeFromCarts(id);
    } else {
      const user = localStorage.getItem('user');
      const userId = user && JSON.parse(user).id;
      this.cartData && this.productService.userRemoveToCart(this.cartData.id).subscribe((result)=>{
        if (result) {
          this.productService.getCartList(userId);
        }
      })
    }
    this.removeCart = false;
  }

  ngOnInit(): void {
    const productId = Number(this.activeRoute.snapshot.paramMap.get('productId'));
    productId && this.productService.getProductById(productId).subscribe((result) => {
      this.productDetails = result;

      const cartData = localStorage.getItem('cartData');
      if(productId && cartData){
        let items = JSON.parse(cartData);
        items = items.filter((item: ProductData)=> productId === item.id)
        if (items.length) {
          this.removeCart =true
        }else {
          this.removeCart = false;
        }
      }
      const user = localStorage.getItem('user');
      if (user) {
        const userId = user && JSON.parse(user).id;
        this.productService.getCartList(userId);
        this.productService.cartDetails.subscribe((result)=>{
          const item = result.filter((item : ProductData)=> productId?.toString() === item.productId?.toString())
          if (item.length) {
            this.cartData = item[0];
            this.removeCart = true;
          }

        })
      }

    });
  }

}
