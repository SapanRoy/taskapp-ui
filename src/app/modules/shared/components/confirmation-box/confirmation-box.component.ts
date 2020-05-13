import { Component, Inject, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
// service
import { ListService } from '../../../card-list/list/service/list.service';
import { CardService } from '../../../card-list/ card/service/card.service';


@Component({
  templateUrl: './confirmation-box.component.html',
  styleUrls: ['./confirmation-box.component.scss'],
})
export class ConfirmationBoxComponent implements OnInit {
  message: string = "This action will delete the";
  item: any;
  title: string;
  constructor(public dialog: MatDialogRef<ConfirmationBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private listService: ListService,
    private cardService: CardService
  ) {
    this.item = data;
  }
  ngOnInit() {
    if (this.item.isList) {
      this.listService.getListById(this.item.listId).subscribe((list) => {
        this.message = `${this.message} list and it's tasks. Are you sure?`;
        this.title = `Delete List-${JSON.parse(JSON.stringify(list)).name}`;
      }, error => { });
    } else {
      this.cardService.getCardById(this.item.listId, this.item.cardId).subscribe((card) => {
        this.message = `${this.message} card. Are you sure?`;
        this.title = `Delete Card-${JSON.parse(JSON.stringify(card)).name}`;
      }, error => { });
    }
  }
  cancel() {
    this.dialog.close(false);
  }
  confirm() {
    this.dialog.close(true);
  }
}
