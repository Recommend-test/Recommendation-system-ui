import { Component, OnInit } from '@angular/core';
import { UserActionWeight } from 'src/app/model/UserActionWeight';
import { UserActionService } from 'src/app/services/userAction.service';
import { Paginator } from 'src/app/model/Paginator';
import { AppConstants } from 'src/app/utility/AppConstants';

@Component({
  selector: 'app-user-action',
  templateUrl: './user-action.component.html',
  styleUrls: ['./user-action.component.css']
})

export class UserActionComponent implements OnInit {

  pageTitle : string = AppConstants.userActionPageTitle;
  userActions: UserActionWeight[];
  allUserActions: UserActionWeight[];
  activePage: number;
  totalRecords: number;
  recordsPerPage: number;
  offset: number;
  size: number;
  cachedPagesCount: number;
  start: number;
  end: number;
  errorMessage: string;

  constructor(private userActionService : UserActionService) { }

  ngOnInit() {
    this.activePage = 1;
    this.recordsPerPage = 5;
    this.offset = 0
    this.size = 5;
    this.cachedPagesCount = this.size/this.recordsPerPage ;
    this.start = 0;
    this.end = this.recordsPerPage;
    this.loadDataForNext(this.offset, this.size);
  }

  displayActivePage(activePage: Paginator) {
    this.activePage = activePage.page;
    if (activePage.type === AppConstants.next) {
      this.start = this.end;
      this.end += this.recordsPerPage;
      if (this.activePage % this.cachedPagesCount == 1 || this.recordsPerPage ===  this.size) {
        this.offset += 1;
        this.loadDataForNext(this.offset, this.size);
        this.userActions = this.allUserActions.slice(this.start, this.end);
      } else {
        this.userActions = this.allUserActions.slice(this.start, this.end);
      }
    }
    else if (activePage.type === AppConstants.previous) {
      this.start-=this.recordsPerPage;
      this.end-=this.recordsPerPage;
      if (this.activePage % this.cachedPagesCount == 0 || this.recordsPerPage ===  this.size) {
        this.offset -= 1;
        this.loadDataForPrevious(this.offset, this.size);
      } else {
        this.userActions = this.allUserActions.slice(this.start, this.end);
      }
    }
  }

  loadDataForNext(offset : number , size : number) {
    this.userActionService.getActionsPage(offset, size).subscribe({
      next: (data) => {      
        this.allUserActions = data.userActionList;
        this.start = 0;
        this.end = this.recordsPerPage;
        this.userActions = this.allUserActions.slice(this.start, this.end);
        this.totalRecords = data.totalCount;
      },
      error: (err) => this.handleError(err),
      complete: () => {
        console.log('Loading User Actions data completed')
      }
    });
  }

  loadDataForPrevious(offset : number , size : number) {
    this.userActionService.getActionsPage(offset, size).subscribe({
      next: (data) => {      
        this.allUserActions = data.userActionList;
        this.end = this.allUserActions.length;
        this.start = this.end - this.recordsPerPage;
        this.userActions = this.allUserActions.slice(this.start, this.end);
        this.totalRecords = data.totalCount;
      },
      error: (err) => this.handleError(err),
      complete: () => {
        console.log('Loading User Actions data completed')
      }
    });
  }

  loadDataAfterDelete(offset: number, size: number) {
    this.userActionService.getActionsPage(offset, size).subscribe({
      next: (data) => {      
        this.allUserActions = data.userActionList;
        this.userActions = this.allUserActions.slice(this.start, this.end);
        this.totalRecords = data.totalCount;
      },
      error: (err) => this.handleError(err),
      complete: () => {console.log('Loading User Actions data completed')
      }
    });
  }

  deleteUserAction(id: number) {
    if (confirm(AppConstants.deleteUserActionConfirmationMessage)) {
      console.log('confirmed');
      this.userActionService.deleteUserAction(id).subscribe({
        next: () => { this.loadDataAfterDelete(this.offset, this.size) },
        error: (error) => { this.errorMessage = error.error.error }
      });
    }
  }

  handleError(error: any) {
    console.log('Error happend while loading user actions data' + JSON.stringify(error));
  }

  closeErrorMessage() {
    this.errorMessage = null;
  }
}
