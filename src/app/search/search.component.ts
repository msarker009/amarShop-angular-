import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../services/product.service";
import {ProductData} from "../type/productData";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{
  constructor(private activeRoute: ActivatedRoute, private productService: ProductService) {
  }
  searchResult: undefined | ProductData[];
  ngOnInit(): void {
    //const query = this.activeRoute.snapshot.paramMap.get('query');
    this.activeRoute.params.subscribe(
      (query: any) => {

         this.productService.searchProduct(query.query).subscribe((result)=> {
          this.searchResult = result;
        })

      }
    );

  }

}
