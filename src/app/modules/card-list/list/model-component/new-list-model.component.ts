// core
import { Component, OnInit, OnDestroy, Inject, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs';

// services
import { ListService } from '../service/list.service';
import { ToastService } from '../../../shared/services/toast.service';
import { CardListModelService } from '../../services/card-list-model.service';

// Model
import { List } from '../model/list.model';
import { CardListModel } from '../../model/card-list.model';

@Component({
  selector: 'component-list-model',
  templateUrl: './new-list-model.component.html',
  styleUrls: ['./new-list-model.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewListModelComponent implements OnDestroy, OnInit {
  listName = new FormControl();
  list: List;
  private cardListModel: CardListModel;
  private cardListModelSubscription: Subscription;

  listForm: FormGroup;
  submitted = false;

  constructor(public dialogRef: MatDialogRef<NewListModelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastService: ToastService,
    private listService: ListService,
    private cardListModelService: CardListModelService,
    private formBuilder: FormBuilder
  ) {
    this.cardListModelSubscription = this.cardListModelService.cardListDataModel.subscribe(modelData => {
      this.cardListModel = modelData;
    });
  }
  ngOnInit() {
    this.listForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }
  ngOnDestroy() {
    this.cardListModelSubscription.unsubscribe();
  }

  // convenience getter for easy access to form fields
  get formControls() { return this.listForm.controls; }

  pushToCardListModel(newList: any) {
    if (!this.cardListModel) {
      // intialize model
      this.cardListModel = new CardListModel();
      this.cardListModel.lists = new Array<List>();
    }
      let list = new List();
      list.id = newList.id;
      list.name = newList.name;
      this.cardListModel.lists.push(list);
  }

  close() {
    this.dialogRef.close();
  }

  addList() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.listForm.invalid) {
      return;
    }
    let paramList = new List();
    paramList.id = null;
    paramList.name = this.listForm.value.name;

    this.listService.addList(paramList).subscribe(listResult => {
      this.close();
      this.getListById(listResult);
      this.toastService.success('List successfully added.');
    }, error => {
      this.toastService.error('Failed to add list.');
    });
  }

  getListById(listParam: any) {
    this.listService.getListById(listParam.id).subscribe(listResult => {
      this.pushToCardListModel(listResult);
      this.cardListModelService.setcardListModel(this.cardListModel);
    });
  }

}