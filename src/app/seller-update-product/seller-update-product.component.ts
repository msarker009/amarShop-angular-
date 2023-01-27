import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../services/product.service";
import {ProductData} from "../type/productData";

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit{

  productData: undefined | ProductData;
  updateMessage: string | undefined;

  constructor(private route: ActivatedRoute,private productService: ProductService) {
  }
  updateProducts(data: ProductData){
    if (this.productData) {
      data.id = this.productData.id;
    }
   this.productService.updateProduct(data).subscribe((result)=> {
     console.log(result);
     if(result) {
       this.updateMessage = "Product is successfully update";
     }
     setTimeout(()=> (this.updateMessage = undefined), 3000);
   })
  }

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    console.log(typeof productId);
    productId && this.productService.getProductById(productId).subscribe((data)=> {
      console.log(data);
      this.productData = data;
    })
  }

}
