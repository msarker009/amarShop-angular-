import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ProductService} from "../services/product.service";
import {ProductData} from "../type/productData";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private route: Router, private productService: ProductService) {
  }

  menuType = 'default';
  sellerName = '';
  userName = '';
  cartItems = 0;
  searchResult: undefined | ProductData[];

  ngOnInit(): void {
    this.route.events.subscribe((result: any) => {
      if (result.url) {
        if (localStorage.getItem('seller') && result.url.includes('seller')) {
          this.menuType = 'seller';
          if (localStorage.getItem('seller')) {
            const sellerStore = localStorage.getItem('seller')
            const sellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName = sellerData.name;
          }
        } else if (localStorage.getItem('user')) {
          const userStore = localStorage.getItem('user')
          const userData = userStore && JSON.parse(userStore);
          this.userName = userData.name;
          this.menuType = 'user';
          this.productService.getCartList(userData.id);
        } else {
          this.menuType = 'default';
        }
      }
    });

    const localCartData = localStorage.getItem('cartData');
    if (localCartData) {
      this.cartItems = JSON.parse(localCartData).length;
    }
    this.productService.cartDetails.subscribe((item)=> {
      this.cartItems = item.length;
    })
  }

  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      this.productService.searchProduct(element.value).subscribe((result) => {
        this.searchResult = result;
      })
    }

  }

  hideSearch() {
    this.searchResult = undefined;
  }

  submitSearch(value: string) {
    if (value) {
      this.route.navigate([`search/${value}`])
    }
  }

  logOut() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }

  userLogout(){
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth']);
    this.productService.cartDetails.emit([]);
  }

}
