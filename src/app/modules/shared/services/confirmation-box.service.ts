import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { ConfirmationBoxComponent } from '../components/confirmation-box/confirmation-box.component';
@Injectable()
export class ConfirmationBoxService {
    constructor(private http: HttpClient,
        public dialog: MatDialog) {
    }
    openConfirmationDialog(listid: string, cardId: string, isList: boolean): Observable<any> {
        const yesNoDialog = this.dialog.open(ConfirmationBoxComponent, {
            data: {
                listId: listid,
                cardId: cardId,
                isList: isList,
            },
            height: '200px',
            width: '400px',
            disableClose: true
        });
        return yesNoDialog.afterClosed();

    }
}

