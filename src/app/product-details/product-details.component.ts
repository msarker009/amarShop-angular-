import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../services/product.service";
import {ProductData} from "../type/productData";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  constructor(private activeRoute: ActivatedRoute, private productService: ProductService) {
  }

  productDetails: undefined | ProductData;
  productQuantity: number = 1;

  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val === "max") {
      this.productQuantity += 1;
    } else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity -= 1;
    }
  }

  ngOnInit(): void {
    let productId = Number(this.activeRoute.snapshot.paramMap.get('productId'));
    productId && this.productService.getProductById(productId).subscribe((result) => {
      this.productDetails = result;
    })
  }

}
