import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class NotificationInterceptor implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          const message = `Request successful: ${JSON.stringify(event.body)}`;
          this.showNotification(message, 'success');
        }
      }),
      catchError((error: HttpErrorResponse) => {
        const message = `Request failed: ${error.message}`;
        this.showNotification(message, 'error');
        return throwError(() => new Error(error.message)); // Rethrow the error to keep the observable chain intact
      })
    );
  }

  private showNotification(message: string, type: 'success' | 'error'): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: type
    });
  }
}
