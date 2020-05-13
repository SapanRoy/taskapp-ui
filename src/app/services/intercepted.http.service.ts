import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse
} from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { MatDialog } from "@angular/material";
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class InterceptedHttpService implements HttpInterceptor {
  constructor(
    public dialog: MatDialog,
  ) {

  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const url = `${environment.apibaseURL}/${req.url}`;
    const modified = req.clone({ url: url, withCredentials: false });
    return next.handle(modified).pipe(
      catchError((error: HttpErrorResponse) => {
        // can handle global error 
        if (error.status === 404) {
          // for e.g page not found redirect to page not found component 
        } else {
          throw error;
        }
        return new Observable<any>();
      })
    );
  }
}
