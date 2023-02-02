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
export class UserAuthComponent implements OnInit{
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
      }
    })
  }

  openSignIn() {
    this.isShowForm = true;
  }

  openSignUp() {
    this.isShowForm = false;
  }
  localCartToRemoteCart(){
    const data = localStorage.getItem('cartData');
    if (data) {
      const cartDataList: ProductData[] = JSON.parse(data);
      const user = localStorage.getItem('user');
      const userId = user && JSON.parse(user).id;
      cartDataList.forEach((product: ProductData)=> {
        const cartData : cartItem = {
          ...product,
          productId: product.id,
          userId
        };
        this.productService.addToCart(cartData);
      })
    }
  }

  ngOnInit(): void {
    this.userService.reloadUserInfo();

  }

}
