// core
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
// components
import { CardComponent } from './ card/card.component';
import { ListComponent } from './list/list.component';
import { NewListModelComponent } from './list/model-component/new-list-model.component';
import { NewCardModelComponent } from './ card/model-component/new/new-card-model.component';

// services
import { ListService } from './list/service/list.service';
import { CardService } from './ card/service/card.service';

@NgModule({
  declarations: [
    CardComponent, ListComponent, NewListModelComponent, NewCardModelComponent
  ],
  imports: [ReactiveFormsModule, CommonModule, DragDropModule],
  entryComponents: [NewListModelComponent, NewCardModelComponent],
  exports: [CardComponent, ListComponent, HttpClientModule],
  providers: [ListService, CardService],
})
export class CardListModule {
}
