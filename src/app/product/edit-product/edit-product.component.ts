import { Component, OnInit, OnDestroy, ElementRef, AfterViewInit, ViewChildren } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControlName, FormControl } from '@angular/forms';
import { NumberValidator } from '../../shared/NumberValidator';
import { ActivatedRoute, Router } from '@angular/router';
import { Iproduct } from '../product-list/product';
import { ProductserviceService } from '../../services/productservice.service';
import { Subscription, Observable, fromEvent, merge } from 'rxjs';
import { GenericValidator } from '../../shared/GenericValidator';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  pageTitle: string = 'Edit Product';
  sub: Subscription;
  product: Iproduct;
  productForm: FormGroup;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  errorMessage: string;
  deleteBtnDisabled: boolean;


  constructor(private fb: FormBuilder, private acRoute: ActivatedRoute, private pService: ProductserviceService, private router: Router) {
    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      productName: {
        required: 'Product name is required.',
        minlength: 'Product name must be at least three characters.',
        maxlength: 'Product name cannot exceed 50 characters.'
      },
      productCode: {
        required: 'Product code is required.'
      },
      starRating: {
        range: 'Rate the product between 1 (lowest) and 5 (highest).'
      }
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }



  get tags(): FormArray {
    return this.productForm.get('tags') as FormArray;
  }

  ngOnInit() {
    this.productForm = this.fb.group({
      productName: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)]],
      productCode: ['', Validators.required],
      starRating: ['', NumberValidator.range(1, 5)],
      tags: this.fb.array([]),
      description: ''
    });

    this.acRoute.paramMap.subscribe(
      params => {
        let id = params.get('id');
        if (id === '0') {
          this.deleteBtnDisabled = true;
          this.pageTitle = 'Add Product';
        }
        else {
          this.deleteBtnDisabled = false;
          this.getProduct(id);
        }
      }
    );

  }

  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    // This is required because the valueChanges does not provide notification on blur
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur event observable with the valueChanges observable
    // so we only need to subscribe once.
    merge(this.productForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.productForm);
    });
  }

  getProduct(id: string) {
    this.sub = this.pService.getProductById(id).subscribe({
      next: (data) => {
        this.product = data;
        this.displayProduct(this.product);
      },
      error: (error) => this.errorMessage = 'Error in the server'
    });
  }

  updateProduct() {
    if (this.productForm.dirty) {
      let p: Iproduct = null;
      if (this.product != null) {
        p = { ...this.product, ...this.productForm.value };
      } else {
        p = this.productForm.value;
      }
      this.pService.updateProduct(p).subscribe(
        {
          next: (data) => { this.updateComplete() }
        }
      );
    } else {
      this.errorMessage = 'please enter data';
    }

  }

  ngOnDestroy(): void {
  }

  displayProduct(product: Iproduct): void {
    if (this.productForm) {
      this.productForm.reset();
    }
    this.product = product;

    this.pageTitle = `Edit Product: ${this.product.productName}`;

    // Update the data on the form
    this.productForm.patchValue({
      productName: this.product.productName,
      productCode: this.product.productCode,
      starRating: this.product.starRating,
      description: this.product.description
    });
    this.productForm.setControl('tags', this.fb.array(this.product.tags || []));
  }

  updateComplete() {
    this.productForm.reset();
    this.router.navigate(['/products']);
  }


  addTag() {
    this.tags.push(new FormControl());
  }

  deleteTag(index: number): void {
    this.tags.removeAt(index);
    this.tags.markAsDirty();
  }

  deleteProduct() {
    this.pService.deleteProduct(this.product.productId).subscribe({
      next: () => { this.updateComplete() }
    });
  }

}
