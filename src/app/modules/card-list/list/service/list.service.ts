// core
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

// rxjs
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

// service
import { CardListModelService } from '../../services/card-list-model.service';

// model
import { CardListModel } from '../../model/card-list.model';
import { List } from '../model/list.model';

@Injectable()
export class ListService {
    private cardListModel: CardListModel;

    constructor(
        private http: HttpClient,
        private cardListModelService: CardListModelService) { }

    addList(list: List) {
        let listdata = new Object();
        listdata['list'] = list;
        return this.http.post('list/add', listdata)
            .pipe(catchError(this.errorHandler));
    }
    deleteList(id: string) {
        return this.http.delete(`list/delete/${id}`)
            .pipe(catchError(this.errorHandler));
    }
    getListById(id) {
        return this.http.get(`list/get/${id}`)
            .pipe(catchError(this.errorHandler));
    }
    getAllLists() {
        return this.http.get('list/getAll')
            .pipe(catchError(this.errorHandler));
    }
    errorHandler(error: HttpErrorResponse) {
        return throwError(error);
    }
    // model related
    private initializeCardListModel() {
        // intialize model
        this.cardListModel = new CardListModel();
        this.cardListModel.lists = new Array<List>();
    }
    populateCardListModel(lists: any) {
        this.initializeCardListModel();
        lists.map(listItem => {
            let list = new List();
            list.id = listItem.id;
            list.name = listItem.name;
            // push cards
            if (listItem.cards && listItem.cards.length)
                list.cards = listItem.cards;

            this.cardListModel.lists.push(list);
        });
        // set to observalable 
        this.cardListModelService.setcardListModel(this.cardListModel);
    }

    populateCards() {

    }

}