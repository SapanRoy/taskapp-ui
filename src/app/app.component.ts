// core
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
// components
import { NewListModelComponent } from './modules/card-list/list/model-component/new-list-model.component';
// services
import { ListService } from './modules/card-list/list/service/list.service';
import { CardListModelService } from './modules/card-list/services/card-list-model.service';
// Model
import { CardListModel, List } from './modules/card-list/model/card-list.model';
// Config
import { AppConfig } from './config/app.config';

@Component({
  selector: 'app-task',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private cardListModel: CardListModel;
  private cardListModelSubscription: Subscription;

  constructor(private dialog: MatDialog,
    private listService: ListService,
    private cardListModelService: CardListModelService) {

    // intialize model
    this.cardListModel = new CardListModel();
    this.cardListModel.lists = new Array<List>();
    // populate model on first load
    this.cardListModelSubscription = this.cardListModelService.cardListDataModel.subscribe(modelData => {
      this.cardListModel = modelData;
    });
  }

  ngOnInit() {
    this.fetchAllLists();
  }

  ngOnDestroy() {
    this.cardListModelSubscription.unsubscribe();
  }
  openAddListDialog() {
    this.dialog.open(NewListModelComponent, {
      height: AppConfig.ModelHeight,
      width: AppConfig.ModelWidth,
    });
  }
  fetchAllLists() {
    this.listService.getAllLists().subscribe(lists => {
      this.listService.populateCardListModel(lists);
    }, error => { debugger; });
  }
}
