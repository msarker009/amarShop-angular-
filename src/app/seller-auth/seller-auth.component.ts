import {Component} from '@angular/core';
import {SellerService} from '../services/seller.service';
import {signIn, signUp} from '../type/authInfo';
import {Router} from '@angular/router'

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})

export class SellerAuthComponent {

  constructor(private seller: SellerService) {
  }

  isShowForm: boolean = false;
  isAuthError: string = '';

  signUp(signUpData: signUp): void {
    this.seller.userSignUp(signUpData);
  }

  Login(signInData: signIn) {
    this.isAuthError = '';
    this.seller.userLogin(signInData);
    this.seller.isLoginError.subscribe((isError) => {
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

  ngOnInit(): void {
    this.seller.reloadSellerInfo();
  }
}
