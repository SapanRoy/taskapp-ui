// core
import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
// rxjs
import { Subscription } from 'rxjs';
// config
import { AppConfig } from '../../../config/app.config';
// components
import { NewCardModelComponent } from '../ card/model-component/new/new-card-model.component';
// services
import { ToastService } from '../../shared/services/toast.service';
import { ListService } from './service/list.service';
import { CardService } from '../ card/service/card.service';
import { ConfirmationBoxService } from '../../shared/services/confirmation-box.service';
import { CardListModelService } from '../services/card-list-model.service';
// model
import { List } from '../model/card-list.model';
import { CardListModel } from '../model/card-list.model';

@Component({
  selector: 'component-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input()
  inputList: any;

  cardListModelSubscription: Subscription;
  currentList: List;
  localCardListModel: CardListModel;
  listsConnectedTo = Array<String>();

  constructor(
    private dialog: MatDialog,
    private listService: ListService,
    private cardService: CardService,
    private toastService: ToastService,
    private confirmationBoxService: ConfirmationBoxService,
    private cardListModelService: CardListModelService
  ) {
  }
  ngOnInit() {
    // populate model on first load
    this.cardListModelSubscription = this.cardListModelService.cardListDataModel.subscribe(modelData => {
      if (this.inputList) {
        this.currentList = modelData.lists.filter(list => list.id == this.inputList.id)[0];
        // get local copy
        this.localCardListModel = modelData;
        // generate ids of list for drag and drop
        this.listsConnectedTo = new Array<string>();
        for (let list of this.localCardListModel.lists) {
          this.listsConnectedTo.push(list.id);
        };
      }
    });

  }
  confirmAndDeleteList(id: string) {
    this.confirmationBoxService.openConfirmationDialog(id, null, true).subscribe((isDeleteConfirmed) => {
      if (isDeleteConfirmed) {
        this.deleteList(id);
      }
    });
  }
  deleteList(id: string) {
    this.listService.deleteList(id).subscribe(() => {
      this.updateCardListModel();
      this.toastService.success(`List successfully deleted.`);
    }, error => {
      this.toastService.error(`Failed to delete list.`);
    });
  }
  // fecth all lists and broadcast
  updateCardListModel() {
    this.listService.getAllLists().subscribe(lists => {
      this.listService.populateCardListModel(lists);
    }, error => { });
  }
  openAddCardDialog() {
    this.dialog.open(NewCardModelComponent, {
      data: {
        listId: this.inputList.id,
      },
      height: AppConfig.ModelHeight,
      width: AppConfig.ModelWidth,
    });
  }

  onCardDrop(data: CdkDragDrop<string[]>): void {

    let sourceList = JSON.parse(JSON.stringify(data.previousContainer.data));
    let targetList = JSON.parse(JSON.stringify(data.container.data));
    let draggedCard = data.item.data;
    if (sourceList.id == targetList.id) {
      return;
    }
    this.cardService.moveCard(sourceList.id, targetList.id, draggedCard.id).subscribe(draggedResult => {
      this.listService.getAllLists().subscribe(lists => {
        this.listService.populateCardListModel(lists);
      }, error => {
        this.toastService.error("Failed to refresh list after dragging.");
      });
    }, error => {
      this.toastService.error("Failed to move card.");
    });
  }
}