import { Component, OnInit, ElementRef, AfterViewInit, ViewChildren } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable, fromEvent, merge } from 'rxjs';
import { GenericValidator } from '../../shared/GenericValidator';
import { debounceTime } from 'rxjs/operators';
import { UserActionWeight } from 'src/app/model/UserActionWeight';
import { UserActionService } from 'src/app/services/userAction.service';
import { AppConstants } from 'src/app/utility/AppConstants';

@Component({
  selector: 'app-user-action-manipulation',
  templateUrl: './user-action-manipulation.component.html',
  styleUrls: ['./user-action-manipulation.component.css']
})
export class UserActionManipulationComponent implements OnInit , AfterViewInit{

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  pageTitle: string = AppConstants.editUserActionPageTitle;
  sub: Subscription;
  userActionWeight: UserActionWeight;
  userActionForm: FormGroup;
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
  constructor(private fb: FormBuilder, private acRoute: ActivatedRoute, private userActionService: UserActionService, private router: Router) {
    this.validationMessages = {
      actionName: {
        required : AppConstants.actionNameRequired,
        minlength : AppConstants.actionNameMinlength,
        maxlength : AppConstants.actionNameMaxlength,
      },
      weight: {
        required: AppConstants.weightRequired
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
    this.userActionForm = this.fb.group({
      id: [''],
      actionName: ['', [Validators.required,
      Validators.minLength(2),
      Validators.maxLength(100)]],
      weight: ['', [Validators.required]]
    });
console.log(this.acRoute);
    this.acRoute.paramMap.subscribe(
      params => {
        
        let id = params.get(AppConstants.id);
        console.log(id);
        if (id === AppConstants.zero) {
          this.deleteBtnDisabled = true;
          this.pageTitle = AppConstants.addUserAction;
        } else {
          this.showId = true;
          this.deleteBtnDisabled = false;
          this.getUserAction(id);
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
    merge(this.userActionForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(400)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.userActionForm);
    });
  }


  /**
   * This method used to get category by id.
   *
   * @param {string} id The id of category.
   * @memberof CategoryManipulationComponent
   */
  getUserAction(id: string) {
    this.sub = this.userActionService.getUserActionWeightById(id).subscribe({
      next: (data) => {
        this.userActionWeight = data;
        this.displayUserAction(this.userActionWeight);
      }, error: (error) => this.errorMessage = 'Error in the server'
    });
  }


  /**
   * This method used to update or add category depend on category variable.
   *
   * @memberof CategoryManipulationComponent
   */
  updateUserAction() {
    if (this.userActionForm.dirty) {
      let userAction: UserActionWeight = null;
      if (this.userActionWeight != null) {
        userAction = { ...this.userActionWeight, ...this.userActionForm.value };
        this.userActionService.updateUserActionWeight(userAction).subscribe(
          {
            next: (data) => { this.updateComplete() }
            , error: (err) => this.handleError(err)
          }
        );
      } else {
        console.log('in add user Action ...');
        userAction = this.userActionForm.value;
        this.userActionService.addUserActionWeight(userAction).subscribe(
          {
            next: (data) => { this.updateComplete() }
            , error: (err) => this.handleError(err)
          }
        );
      }

    } else {
      this.errorMessage = AppConstants.enterDataError;
    }
  }

  /**
   * This method used to display category detail.
   *
   * @param {Category} category The category which will be displayed.
   * @memberof CategoryManipulationComponent
   */
  displayUserAction(userActionWeight: UserActionWeight): void {
    if (this.userActionForm) {
      this.userActionForm.reset();
    }
    this.userActionWeight = userActionWeight;
    this.pageTitle = `Edit User Action : ${this.userActionWeight.actionName}`;
    this.userActionForm.patchValue({
      actionName: this.userActionWeight.actionName,
      weight: this.userActionWeight.weight,
      id: this.userActionWeight.id
    });
  }


  /**
   * This method used to return to categories page after update or add category.
   *
   * @memberof CategoryManipulationComponent
   */
  updateComplete() {
    this.userActionForm.reset();
    this.router.navigate(['/actions']);
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


