import { Component, OnInit, ElementRef, AfterViewInit, ViewChildren } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable, fromEvent, merge } from 'rxjs';
import { GenericValidator } from '../../shared/GenericValidator';
import { debounceTime } from 'rxjs/operators';
import { AppConstatnts } from '../../utility/AppConstants';
import { Product } from 'src/app/model/Product';
import { ProductService } from 'src/app/services/productservice.service';
import { ProductDataService } from '../data-service/ProductsDataService';


@Component({
  selector: 'app-product-manipulation',
  templateUrl: './product-manipulation.component.html',
  styleUrls: ['./product-manipulation.component.css']
})
export class ProductManipulationComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  pageTitle: string = AppConstatnts.editProductPageTitle;
  sub: Subscription;
  product: Product;
  categoryId: number;
  productForm: FormGroup;
  errorMessage: string;
  deleteBtnDisabled: boolean;
  showId: boolean = false;
  passedId: string;
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;



  /**
   * Creates instance of FormBuilder, ActivatedRoute, ProductService and Router using dependency injection.
   * Init validationMessages.
   * @param {FormBuilder} fb
   * @param {ActivatedRoute} acRoute
   * @param {ProductService} productService
   * @param {Router} router
   * @memberof ProductManipulationComponent
   */
  constructor(private fb: FormBuilder, private acRoute: ActivatedRoute, private productService: ProductService, private router: Router, private productDataService: ProductDataService) {
    this.validationMessages = {
      productName: {
        required: AppConstatnts.productNameRequired,
        minlength: AppConstatnts.productNameMinLength,
        maxlength: AppConstatnts.productNameMaxLength
      },
      productDescription: {
        required: AppConstatnts.productDescriptionRequired,
        minlength: AppConstatnts.productDescriptionMinLength,
        maxlength: AppConstatnts.productDescriptionMaxLength
      }

    };
    this.genericValidator = new GenericValidator(this.validationMessages);
  }


  /**
   * This method used to init productForm and get product detail if id not equal 0.
   * 
   * @memberof ProductManipulationComponent
   */
  ngOnInit() {
    this.productDataService.productObservable.subscribe(product => {
      this.product = product;
    });

    this.productDataService.categoryIdObservable.subscribe(categoryId => {
      this.categoryId = categoryId;
    });

    this.productForm = this.fb.group({
      id: [''],
      productName: ['', [Validators.required,
      Validators.minLength(AppConstatnts.productNameMinLengthValue),
      Validators.maxLength(AppConstatnts.productNameMaxLengthValue)]],
      productDescription: ['', [Validators.required,
      Validators.minLength(AppConstatnts.productDescriptionMinLengthValue),
      Validators.maxLength(AppConstatnts.productDescriptionMaxLengthValue)]]
    });

    this.acRoute.paramMap.subscribe(
      params => {
        let id = params.get(AppConstatnts.id);
        this.passedId = id;
        if (id === AppConstatnts.zero) {
          this.deleteBtnDisabled = true;
          this.pageTitle = AppConstatnts.addProduct;
        } else {
          this.showId = true;
          this.deleteBtnDisabled = false;
          this.displayProduct(this.product);
        }
      }
    );
  }


  /**
   * This method used to handle error messages.
   *
   * @memberof ProductManipulationComponent
   */
  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    // This is required because the valueChanges does not provide notification on blur
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur event observable with the valueChanges observable
    // so we only need to subscribe once.
    merge(this.productForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(400)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.productForm);
    });
  }


  /**
   * This method used to update or add product depend on product variable.
   *
   * @memberof ProductManipulationComponent
   */
  updateProduct() {
    if (this.productForm.dirty) {
      let product: Product = null;
      if (this.product.id != null && this.product.id.toString() !== '' && this.passedId !== '0') {
        product = { ...this.product, ...this.productForm.value };
        product.categoryId = this.categoryId;
        this.productService.updateProduct(product).subscribe(
          {
            next: (data) => { this.updateComplete() }
            , error: (err) => this.handleError(err)
          }
        );
      } else {
        console.log('in add product ...');
        product = this.productForm.value;
        product.categoryId = this.categoryId;
        this.productService.addProduct(product).subscribe(
          {
            next: (data) => { this.updateComplete() }
            , error: (err) => this.handleError(err)
          }
        );
      }

    } else {
      this.errorMessage = AppConstatnts.enterDataError;
    }
  }

  /**
   * This method used to display product detail.
   *
   * @param {Product} product The product which will be displayed.
   * @memberof ProductManipulationComponent
   */
  displayProduct(product: Product): void {
    if (this.productForm) {
      this.productForm.reset();
    }
    this.product = product;
    this.pageTitle = `Edit Product: ${this.product.productName}`;
    this.productForm.patchValue({
      productName: this.product.productName,
      id: this.product.id,
      productDescription: this.product.productDescription
    });
  }


  /**
   * This method used to return to products page after update or add product.
   *
   * @memberof ProductManipulationComponent
   */
  updateComplete() {
    this.productForm.reset();
    this.router.navigate(['/products']);
  }


  /**
   * This method handle error and set errorMessage.
   *
   * @param {*} error
   * @memberof ProductManipulationComponent
   */
  handleError(error: any) {
    this.errorMessage = error.error.error;
  }

  /**
   * This method used to close the error message.
   *
   * @memberof ProductManipulationComponent
   */
  closeErrorMessage() {
    this.errorMessage = null;
  }
}

