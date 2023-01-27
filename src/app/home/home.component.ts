import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {ProductData} from "../type/productData";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  constructor(private productService: ProductService) {
  }

  popularProductLists: undefined| ProductData[];
  trendyProductLists: undefined| ProductData[];

  ngOnInit(): void {
    this.productService.getPopularProduct().subscribe((data)=> {
      if (data) {
        this.popularProductLists = data;
      }
    });

    this.productService.getTrendyProduct().subscribe((data)=> {
      if(data) {
        this.trendyProductLists = data;
      }
    })
  }
}
