import { Component, OnInit, ElementRef, AfterViewInit, ViewChildren } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription, Observable, fromEvent, merge } from 'rxjs';
import { GenericValidator } from '../../shared/GenericValidator';
import { debounceTime } from 'rxjs/operators';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/model/Category';


@Component({
  selector: 'app-category-manipulation',
  templateUrl: './category-manipulation.component.html',
  styleUrls: ['./category-manipulation.component.css']
})
export class CategoryManipulationComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  pageTitle: string = 'Edit Category';
  sub: Subscription;
  category: Category;
  categoryForm: FormGroup;
  errorMessage: string;
  deleteBtnDisabled: boolean;
  showId: boolean = false;
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(private fb: FormBuilder, private acRoute: ActivatedRoute, private categoryService: CategoryService, private router: Router) {
    this.validationMessages = {
      categoryName: {
        required: 'Category name is required.',
        minlength: 'Category name must be at least three characters.',
        maxlength: 'Category name cannot exceed 100 characters.'
      }
    };
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit() {
    this.categoryForm = this.fb.group({
      id: [''],
      categoryName: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100)]]
    });

    this.acRoute.paramMap.subscribe(
      params => {
        let id = params.get('id');
        if (id === '0') {
          this.deleteBtnDisabled = true;
          this.pageTitle = 'Add Category';
        } else {
          this.showId = true;
          this.deleteBtnDisabled = false;
          this.getCategory(id);
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
    merge(this.categoryForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(400)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.categoryForm);
    });
  }

  getCategory(id: string) {
    this.sub = this.categoryService.getCategoryById(id).subscribe({
      next: (data) => {
        this.category = data;
        this.displayCategory(this.category);
      }, error: (error) => this.errorMessage = 'Error in the server'
    });
  }

  updateCategory() {
    if (this.categoryForm.dirty) {
      let category: Category = null;
      if (this.category != null) {
        category = { ...this.category, ...this.categoryForm.value };
        this.categoryService.updateCategory(category).subscribe(
          {
            next: (data) => { this.updateComplete() }
          }
        );
      } else {
        category = this.categoryForm.value;
        this.categoryService.addCategory(category).subscribe(
          {
            next: (data) => { this.updateComplete() }
          }
        );
      }

    } else {
      this.errorMessage = 'please enter data';
    }
  }

  displayCategory(category: Category): void {
    if (this.categoryForm) {
      this.categoryForm.reset();
    }
    this.category = category;
    this.pageTitle = `Edit Category: ${this.category.categoryName}`;
    this.categoryForm.patchValue({
      categoryName: this.category.categoryName,
      id: this.category.id
    });

  }

  updateComplete() {
    this.categoryForm.reset();
    this.router.navigate(['/categories']);
  }


}

