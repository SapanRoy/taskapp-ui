// core
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

// rxjs
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

// service
import { CardListModelService } from '../../services/card-list-model.service';
import { ListService } from '../../list/service/list.service';

// model
import { CardListModel } from '../../model/card-list.model';
import { Card } from '../model/card.model';

@Injectable()
export class CardService {
    private cardListModel: CardListModel;
    constructor(
        private http: HttpClient,
        private cardListModelService: CardListModelService,
        private listService: ListService) { }

    addCard(card: Card, parentListId: string) {

        let cardData = new Object();
        cardData['parentListId'] = parentListId;
        cardData['name'] = card.name;

        let paramObj = new Object();
        paramObj['card'] = cardData;
        return this.http.post('card/add', paramObj)
            .pipe(catchError(this.errorHandler));
    }
    moveCard(sourceListId: string, targetListId: string, cardId: string) {
        let cardPramObj = new Object();
        cardPramObj["card"] = { "sourceListId": sourceListId, "targetListId": targetListId,
        "cardId": cardId };
        return this.http.post(`card/move`, cardPramObj)
            .pipe(catchError(this.errorHandler));
    }
    deleteCard(listId: string, cardId: string) {
        return this.http.delete(`list/card/delete/${listId}/${cardId}`).pipe(catchError(this.errorHandler));
    }
    getCardById(listId: string, cardId: string) {
        return this.http.get(`list/card/get/${listId}/${cardId}`).pipe(catchError(this.errorHandler));
    }
    getCardFromList(listId: string, cardId: string) {
        return this.http.post(`list/card`, { "listId": listId, "cardId": cardId })
            .pipe(catchError(this.errorHandler));
    }
    errorHandler(error: HttpErrorResponse) {
        return throwError(error);
    }

}