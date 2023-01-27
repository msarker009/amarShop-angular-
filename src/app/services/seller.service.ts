import {HttpClient} from '@angular/common/http';
import {EventEmitter, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {signIn, signUp} from "../type/authInfo";

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {
  }

  userSignUp(data: signUp) {
    this.http.post("http://localhost:3000/seller", data, {observe: 'response'}).subscribe((result) => {
      if (result) {
        localStorage.setItem("seller", JSON.stringify(result.body))
        this.router.navigate(['seller-home']);
        console.log(result);
      }

    });
  }

  userLogin(data: signIn) {
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`, {observe: 'response'}).subscribe((result: any) => {
      if (result && result.body && result.body.length) {
        localStorage.setItem("seller", JSON.stringify(result.body))
        this.router.navigate(['seller-home']);
        console.log(result);
      } else {
        this.isLoginError.emit(true);
      }
    });
  }

  reloadSellerInfo() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }
}
