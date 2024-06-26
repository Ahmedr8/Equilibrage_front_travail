import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class NotificationInterceptor implements HttpInterceptor {

  constructor(private toastr: ToastrService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse && event.body?.message) {
          const message = event.body.message;
          this.toastr.success(message, 'Success');
        }
      }),
      catchError((error: HttpErrorResponse) => {
        const message = error.error?.message || 'Request failed';
        this.toastr.error(message, 'Error');
        return throwError(() => new Error(error.message)); // Rethrow the error to keep the observable chain intact
      })
    );
  }
}
