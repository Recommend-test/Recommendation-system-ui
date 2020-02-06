import { Component, OnInit } from '@angular/core';
import { Iproduct } from '../model/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductserviceService } from '../../services/productservice.service';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  pageTitle: string;
  product: Iproduct;
  constructor(private route: ActivatedRoute, private router: Router, private prodcutService: ProductserviceService) {

  }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.pageTitle = id;

    this.prodcutService.getProductById(id).subscribe({
      next: (data) => {
        console.log('data resceived');
        this.product = data;

      },
      error: (err) => { console.log(err) },
      complete: () => {
        console.log('complete')
      }
    })


  }

  onBack() {
    this.router.navigate(['/products']);
  }
}
