import { Component, OnInit, OnChanges } from '@angular/core';
import { Iproduct } from './product';
import { ProductserviceService } from '../../services/productservice.service';
import { AppConstatnts } from '../../utility/AppConstatnts';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  pageTitle: string = AppConstatnts.productListPageTitle;
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  showImageText: string = 'Show Image';
  _filterByText: string;
  filtedProducts: Iproduct[];
  items: Iproduct[];
  offset: number = 0;
  size: number = 10;
  previousBtn: string = 'disabled';
  nextBtn: string = 'page-item';

  constructor(private productService: ProductserviceService) {

  }

  set filterByText(filter: string) {
    this._filterByText = filter;
    this.filtedProducts = filter != null ? this.performFilter(this._filterByText) : this.items;
  }

  get filterByText(): string {
    return this._filterByText;
  }

  performFilter(filterValue: string): Iproduct[] {
    return this.items.filter((product: Iproduct) =>
      product.productName.toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) != -1
    );
  }


  ngOnInit() {
    console.log("On Init Method");
    this.displayPage(this.offset, this.size + 1, 'init');
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
    if (this.showImage) {
      this.showImageText = 'hide image';
    } else {
      this.showImageText = 'show image';
    }
  }

  recieveEvent(message: string) {
    console.log(message);
  }

  previous() {
    this.offset += -10;
    this.displayPage(this.offset, this.size + 1, 'previous');
  }

  next() {
    this.offset += +10;
    this.displayPage(this.offset, this.size + 1, 'next');
  }

  displayPage(offset: number, size: number, type: string) {
    this.productService.getProducts(offset, size).subscribe({
      next: (data) => {
        if (type === 'init') {
          this.handleDisplayInit(data);
        } else if (type === 'next') {
          this.handleDisplayDataNext(data);
        } else if (type === 'previous') {
          this.handleDisplayDataPrevious(data);
        }
      },
      error: (err) => { console.log('Error' + err) },
      complete: () => {
        console.log('complete')
      }
    });
  }

  handleDisplayInit(data: Iproduct[]) {
    if (data.length < 11 && data.length > 1) {
      this.items = data;
      this.filtedProducts = this.items;
    } else if (data.length == 11) {
      data.pop();
      this.items = data;
      this.filtedProducts = this.items;
    } else {
      this.handleDisplayPaginatorButtons(true, true);
    }
  }

  handleDisplayDataNext(data: Iproduct[]) {
    if (data.length < 11 && data.length > 1) {
      this.items = data;
      this.filtedProducts = this.items;
      this.handleDisplayPaginatorButtons(false, true);
    } else if (data.length == 11) {
      data.pop();
      this.items = data;
      this.filtedProducts = this.items;
      this.handleDisplayPaginatorButtons(false, false);
    } else {
      this.handleDisplayPaginatorButtons(false, true);
    }
  }

  handleDisplayDataPrevious(data: Iproduct[]) {
    if (data.length < 11 && data.length > 1) {
      this.items = data;
      this.filtedProducts = this.items;
      this.handleDisplayPaginatorButtons(true, false);
    } else if (data.length == 11) {
      data.pop();
      this.items = data;
      this.filtedProducts = this.items;
      this.handleDisplayPaginatorButtons(false, false);
    } else {
      this.handleDisplayPaginatorButtons(true, false);
    }
    if (this.offset == 0)
      this.handleDisplayPaginatorButtons(true, false);
  }

  handleDisplayPaginatorButtons(previousBtnDisable: boolean, nextBtnDisable: boolean) {
    this.nextBtn = nextBtnDisable == true ? 'disabled' : 'page-item';
    this.previousBtn = previousBtnDisable == true ? 'disabled' : 'page-item';
  }

}
