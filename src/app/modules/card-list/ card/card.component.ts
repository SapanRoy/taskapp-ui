// core
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
// rxjs
import { Subscription } from 'rxjs';
// service
import { ConfirmationBoxService } from '../../shared/services/confirmation-box.service';
import { CardService } from './service/card.service';
import { ToastService } from '../../shared/services/toast.service';
import { ListService } from '../list/service/list.service';
import { CardListModelService } from '../services/card-list-model.service';
// Model
import { CardListModel } from '../model/card-list.model';
import { List } from '../model/card-list.model';

@Component({
  selector: 'component-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  constructor(private confirmationBoxService: ConfirmationBoxService,
    private listService: ListService,
    private cardService: CardService,
    private toastService: ToastService,
    private cardListModelService: CardListModelService) { }
  
  @Input()
  parentListId: string;
  @Input()
  inputCard: any;

  localCardListModel: CardListModel;
  currentList: List;

  cardListModelSubscription: Subscription;

  ngOnInit() {
    this.cardListModelSubscription = this.cardListModelService.cardListDataModel.subscribe(modelData => {
      this.currentList = modelData.lists.filter(list => list.id == this.parentListId)[0];
      this.localCardListModel = modelData;
    });
  }
  ngDestroy() {
    //this.cardListModelSubscription.unsubscribe();
  }

  confirmAndDeleteCard() {
    this.confirmationBoxService.openConfirmationDialog(this.parentListId, this.inputCard.id, false).subscribe((isDeleteConfirmed) => {
      if (isDeleteConfirmed) {
        this.deleteCard();
      }
    });
  }

  deleteCard() {
    this.cardService.deleteCard(this.parentListId, this.inputCard.id).subscribe(() => {
      //this.cardService.updateListInModel();
      this.toastService.success(`Card successfully deleted.`);
      this.updateListInModel(this.parentListId);
    }, error => {
      this.toastService.error(`Failed to delete card.`);
    });
  }

  updateListInModel(parentListId: string): void {
    this.listService.getAllLists().subscribe(lists => {
      this.localCardListModel["lists"] = Array.from(JSON.parse(JSON.stringify(lists)));
      this.cardListModelService.setcardListModel(this.localCardListModel);
    }, error => {
      console.log(`Error while updating model after card deletion.`);
    });

    // TODO: Need card's releted list
    // this.listService.getListById(parentListId).subscribe(list => {
    //   let localCurrentListFromModel: any;
    //   localCurrentListFromModel = this.localCardListModel.lists.filter(list => list.id = this.currentList.id);
    //   debugger;
    //   // update cards list in current model by reference and broadcase
    //   localCurrentListFromModel.cards = JSON.parse(JSON.stringify(list)).cards;
    //   this.cardListModelService.setcardListModel(this.localCardListModel);
    // }, error => { });
  }
}