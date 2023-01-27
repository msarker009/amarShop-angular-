import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {ProductData} from "../type/productData";
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit{
  productLists: ProductData[] | undefined;
  deleteMessage: string | undefined;
  icon = faTrash;
  constructor(private productService: ProductService) {
  }

  productLst(){
    this.productService.getProduct().subscribe((result)=> {
      if (result){
        console.log(result)
        this.productLists = result;
      }
    })
  }

  deleteProduct(id: number) {
   this.productService.deleteProduct(id).subscribe((result)=> {
     if (result){
       this.deleteMessage = 'Product is Deleted'
       this.productLst();
     }
     setTimeout(()=> (this.deleteMessage = undefined),3000);
   })

  }

  ngOnInit(): void {
  this.productLst();
  }

}
