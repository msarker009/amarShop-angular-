import {Component, OnInit} from '@angular/core';
import {userSignIn, userSignUp} from "../type/userAuthInfo";
import {UserService} from "../services/user.service";
import {cartItem, ProductData} from "../type/productData";
import {ProductService} from "../services/product.service";

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  constructor(private userService: UserService, private productService: ProductService) {
  }

  isShowForm = true;
  isAuthError = '';

  signUp(signUpData: userSignUp): void {
    this.userService.userSignUp(signUpData);
  }

  Login(signInData: userSignIn) {
    this.isAuthError = '';
    this.userService.userSignIn(signInData);
    this.userService.isLoginError.subscribe((isError) => {
      if (isError) {
        this.isAuthError = "Email or Password not correct!"
      } else {
        this.localCartToRemoteCart()
      }
    })
  }

  openSignIn() {
    this.isShowForm = true;
  }

  openSignUp() {
    this.isShowForm = false;
  }

  localCartToRemoteCart() {
    const data = localStorage.getItem('cartData');
    const user = localStorage.getItem('user');
    const userId = user && JSON.parse(user).id;
    if (data) {
      const cartDataList: ProductData[] = JSON.parse(data);
      cartDataList.forEach((product: ProductData, index) => {
        const cartData: cartItem = {
          ...product,
          productId: product.id,
          userId
        };
        setTimeout(() => {
          this.productService.userAddToCart(cartData).subscribe((result) => {
            if (result) {
              console.log("item add");
            }
          })
          if (cartDataList.length === index+1){
            localStorage.removeItem('cartData');
          }
        }, 500)

      })
    }
    setTimeout(()=> {
      this.productService.getCartList(userId);
    },2000)

  }

  ngOnInit(): void {
    this.userService.reloadUserInfo();

  }

}
