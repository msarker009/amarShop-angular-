import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {userSignIn, userSignUp} from "../type/userAuthInfo";
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router) { }
  isUserLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);

  userSignUp(data: userSignUp) {
    return this.http.post("http://localhost:3000/users", data, {observe: "response"}).subscribe((result)=> {
      if (result) {
        localStorage.setItem("user",JSON.stringify(result.body));
        this.router.navigate(['/']);
      }
    });
  }

  userSignIn(data: userSignIn) {
    this.http.get<userSignUp[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`, {observe: 'response'}).subscribe((result: any) => {
      if (result && result.body?.length) {
        localStorage.setItem("user", JSON.stringify(result.body[0]))
        this.router.navigate(['/']);
        this.isLoginError.emit(false);
      } else {
        this.isLoginError.emit(true);
      }
    });
  }
  reloadUserInfo() {
    if (localStorage.getItem('user')) {
      this.isUserLoggedIn.next(true);
      this.router.navigate(['/']);
    }
  }
}
