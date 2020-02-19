import { Component, OnInit, ElementRef, AfterViewInit, ViewChildren } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable, fromEvent, merge } from 'rxjs';
import { GenericValidator } from '../../shared/GenericValidator';
import { debounceTime } from 'rxjs/operators';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/model/Category';
import { AppConstatnts } from '../../utility/AppConstatnts';


@Component({
  selector: 'app-category-manipulation',
  templateUrl: './category-manipulation.component.html',
  styleUrls: ['./category-manipulation.component.css']
})
export class CategoryManipulationComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  pageTitle: string = AppConstatnts.editCategoryPageTitle;
  sub: Subscription;
  category: Category;
  categoryForm: FormGroup;
  errorMessage: string;
  deleteBtnDisabled: boolean;
  showId: boolean = false;
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;


  /**
   * Creates instance of FormBuilder, ActivatedRoute, CategoryService and Router using dependency injection.
   * Init validationMessages.
   * @param {FormBuilder} fb
   * @param {ActivatedRoute} acRoute
   * @param {CategoryService} categoryService
   * @param {Router} router
   * @memberof CategoryManipulationComponent
   */
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


  /**
   * This method used to init categoryForm and get category detail if id not equal 0.
   * 
   * @memberof CategoryManipulationComponent
   */
  ngOnInit() {
    this.categoryForm = this.fb.group({
      id: [''],
      categoryName: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100)]]
    });
console.log(this.acRoute);
    this.acRoute.paramMap.subscribe(
      params => {
        
        let id = params.get(AppConstatnts.id);
        console.log(id);
        if (id === AppConstatnts.zero) {
          this.deleteBtnDisabled = true;
          this.pageTitle = AppConstatnts.addCategory;
        } else {
          this.showId = true;
          this.deleteBtnDisabled = false;
          this.getCategory(id);
        }
      }
    );
  }


  /**
   * This method used to handle error messages.
   *
   * @memberof CategoryManipulationComponent
   */
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


  /**
   * This method used to get category by id.
   *
   * @param {string} id The id of category.
   * @memberof CategoryManipulationComponent
   */
  getCategory(id: string) {
    this.sub = this.categoryService.getCategoryById(id).subscribe({
      next: (data) => {
        this.category = data;
        this.displayCategory(this.category);
      }, error: (error) => this.errorMessage = 'Error in the server'
    });
  }


  /**
   * This method used to update or add category depend on category variable.
   *
   * @memberof CategoryManipulationComponent
   */
  updateCategory() {
    if (this.categoryForm.dirty) {
      let category: Category = null;
      if (this.category != null) {
        category = { ...this.category, ...this.categoryForm.value };
        this.categoryService.updateCategory(category).subscribe(
          {
            next: (data) => { this.updateComplete() }
            , error: (err) => this.handleError(err)
          }
        );
      } else {
        console.log('in add category ...');
        category = this.categoryForm.value;
        this.categoryService.addCategory(category).subscribe(
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
   * This method used to display category detail.
   *
   * @param {Category} category The category which will be displayed.
   * @memberof CategoryManipulationComponent
   */
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


  /**
   * This method used to return to categories page after update or add category.
   *
   * @memberof CategoryManipulationComponent
   */
  updateComplete() {
    this.categoryForm.reset();
    this.router.navigate(['/categories']);
  }


  /**
   * This method handle error and set errorMessage.
   *
   * @param {*} error
   * @memberof CategoryManipulationComponent
   */
  handleError(error: any) {
    this.errorMessage = error.error.error;
  }

  /**
   * This method used to close the error message.
   *
   * @memberof CategoryListComponent
   */
  closeErrorMessage() {
    this.errorMessage = null;
  }
}

