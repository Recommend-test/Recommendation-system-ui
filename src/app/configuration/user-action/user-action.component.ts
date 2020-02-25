import { Component, OnInit } from '@angular/core';
import { AppConstatnts } from 'src/app/utility/AppConstatnts';
import { UserActionWeight } from 'src/app/model/UserActionWeight';
import { UserActionService } from 'src/app/services/userAction.service';

@Component({
  selector: 'app-user-action',
  templateUrl: './user-action.component.html',
  styleUrls: ['./user-action.component.css']
})

export class UserActionComponent implements OnInit {

  pageTitle : string = AppConstatnts.userActionPageTitle;
  userActions: UserActionWeight[];
  allUserActions: UserActionWeight[];
  activePage: number;
  totalRecords: number;
  recordsPerPage: number;
  offset: number;
  size: number;
  cachedPagesSize: number;
  start: number;
  end: number;
  errorMessage: string;

  constructor(private userActionService : UserActionService) { }

  ngOnInit() {
    this.activePage = 1;
    this.recordsPerPage = 5;
    this.offset = 0
    this.size = 7;
    this.cachedPagesSize = 3;
    this.start = 0;
    this.end = this.recordsPerPage;
    this.loadData(this.offset, this.size);
  }

    /**
   * This method used to load categories based on offset and size.
   *
   * @param {number} offset Refer to page number.
   * @param {number} size Refer to number of records per page.
   * @memberof CategoryListComponent
   */
  loadData(offset : number , size : number) {
    this.userActionService.getActionsPage(offset, size).subscribe({
      next: (data) => {      
        this.allUserActions = data.userActionList;

        console.log(this.allUserActions);

        console.log(data);

        this.userActions = this.allUserActions.slice(this.start, this.end);
        this.totalRecords = data.totalCount;
      },
      error: (err) => this.handleError(err),
      complete: () => {
        console.log('Loading User Actions data completed')
      }
    });
  }

    /**
   * This method used to log error if it happend while loading data.
   * @param {*} error
   * @memberof CategoryListComponent
   */
  handleError(error: any) {
    console.log('Error happend while loading categories data' + JSON.stringify(error));
  }

}
