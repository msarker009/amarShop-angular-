import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ProductService} from "../services/product.service";
import {ProductData} from "../type/productData";

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit{
  addProductMessage: string | undefined;
  constructor(private productService: ProductService) {
  }
  addProducts(data:ProductData){
   this.productService.addProduct(data).subscribe((result) => {
     if (result) {
       this.addProductMessage ="Product is successfully added";
     }
     setTimeout(() => (this.addProductMessage= undefined), 3000)
   })
  }

  ngOnInit(): void {
  }



}
