import {Component, OnInit} from '@angular/core';
import {userSignIn, userSignUp} from "../type/userAuthInfo";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit{
  constructor(private userService: UserService) {
  }

  isShowForm: boolean = true;
  isAuthError: string = '';

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

  ngOnInit(): void {
    this.userService.reloadUserInfo();

  }

}
