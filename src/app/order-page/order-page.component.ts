import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {orderDetails} from "../type/orderInfo";

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit{
  constructor(private productService: ProductService) {
  }
  orderData: orderDetails[] | undefined;

  cancelOrder(orderId: number | undefined) {
     orderId && this.productService.cancelOrder(orderId).subscribe((result)=> {
       this.getOrderList();
     })
  }
  getOrderList() {
    this.productService.orderLists().subscribe((result)=> {
      if (result) {
        this.orderData = result;
      }
    })
  }
  ngOnInit(): void {
    this.getOrderList();
  }

}
