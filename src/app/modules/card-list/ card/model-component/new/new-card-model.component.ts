// core
import { Component, OnInit, OnDestroy, Inject, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs';

// services
import { CardService } from '../../service/card.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { CardListModelService } from '../../../services/card-list-model.service';

// Model
import { Card } from '../../model/card.model';
import { CardListModel, List  } from '../../../model/card-list.model';
@Component({
  selector: 'component-list-model',
  templateUrl: './new-card-model.component.html',
  styleUrls: ['./new-card-model.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewCardModelComponent implements OnDestroy, OnInit {
  parentListId: string;
  parentListName: string;
  cardName = new FormControl();
  card: Card;
  private cardListModel: CardListModel;
  private cardListModelSubscription: Subscription;

  cardForm: FormGroup;
  submitted = false;

  constructor(public dialogRef: MatDialogRef<NewCardModelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastService: ToastService,
    private cardService: CardService,
    private cardListModelService: CardListModelService,
    private formBuilder: FormBuilder
  ) {
    this.cardListModelSubscription = this.cardListModelService.cardListDataModel.subscribe(modelData => {
      this.cardListModel = modelData;
      this.parentListId = data.list.id;
      this.parentListName = data.list.name;
    });
  }
  ngOnInit() {
    this.cardForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }
  ngOnDestroy() {
    this.cardListModelSubscription.unsubscribe();
  }

  // convenience getter for easy access to form fields
  get formControls() { return this.cardForm.controls; }

  close() {
    this.dialogRef.close();
  }

  addCard() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.cardForm.invalid) {
      return;
    }
    let paramCard = new Card();
    paramCard.id = null;
    paramCard.name = this.cardForm.value.name;

    this.cardService.addCard(paramCard, this.parentListId).subscribe(cardResult => {
      this.close();
      this.toastService.success(`Card successfully added.`);
      let cardResultData: any = JSON.parse(JSON.stringify(cardResult)).cardList;
      // get new card details
      this.getCardFromList(cardResultData.parentListId, cardResultData.newCardId);
    }, error => {
      this.toastService.error('Failed to add card.');
    });
  }
  getCardFromList(listId: string, cardId: string) {
    this.cardService.getCardFromList(listId, cardId).subscribe(cardListResult => {
      let cardListResultObj = JSON.parse(JSON.stringify(cardListResult));
      this.updateCardListModel(cardListResultObj.card, cardListResultObj.card.parentListId)
    }, error => {

    });
  }

  updateCardListModel(newCard: any, listId: string) {
    let list: List = this.cardListModel.lists.filter(list => list.id == listId)[0];
    let card = new Card();
    card.id = newCard.id;
    card.name = newCard.name;
    if (!list.cards) {
      list.cards = new Array<Card>();
    }
    list.cards.push(card);
    // boardcast
    this.cardListModelService.setcardListModel(this.cardListModel);
  }
}