// core
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
// custome model
import { CardListModel } from '../model/card-list.model';

@Injectable({providedIn:'root'})
export class CardListModelService {
   
    private _cardListModelSubject: Subject<CardListModel> = new BehaviorSubject<CardListModel>(null);
    public cardListDataModel = this._cardListModelSubject.asObservable().pipe(filter(x => x !== null));;
   
    setcardListModel(cardListModel: any) {
        this._cardListModelSubject.next(cardListModel);
    }
}