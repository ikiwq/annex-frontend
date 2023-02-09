import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, Observable, switchMap, throwError, filter, take } from "rxjs";
import { LoginResponse } from "src/app/models/login-response.payload";
import { SharedService } from "./services/auth/shared/shared.service";

@Injectable({
    providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor{
    isTokenRefreshing = false;
    refreshTokenSubject : BehaviorSubject<any> = new BehaviorSubject(null);

    constructor(public sharedService : SharedService){

    }
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const jwtToken = this.sharedService.getJwtToken();

        req.headers.set('Content-Type', 'application/json; charset=utf-8');

        if(jwtToken && !this.isTokenRefreshing){
            req = this.addToken(req, jwtToken);
        }

        return next.handle(req).pipe(catchError(error => {
            if(error instanceof HttpErrorResponse && (error.status === 403) ){
                return this.handleAuthErrors(req, next);
            }
            else{
                return throwError(()=> new Error(error.error));
            }
        }));
    }

    private handleAuthErrors(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{

        if(!this.isTokenRefreshing){

            this.isTokenRefreshing = true;
            this.refreshTokenSubject.next(null);
            
            return this.sharedService.refreshToken().pipe(
                switchMap((refreshTokenResponse : LoginResponse) => {

                    this.isTokenRefreshing = false;
                    this.refreshTokenSubject.next(refreshTokenResponse.authToken);
                    
                    return next.handle(this.addToken(req, refreshTokenResponse));
                })
            )
        }else{
            return this.refreshTokenSubject.pipe(
                filter(result => result !== null),
                take(1),
                switchMap((res)=> {
                    return next.handle(this.addToken(req, this.sharedService.getJwtToken()))
                })
            )
        }
    }
    
    addToken(req: HttpRequest<any>, jwtToken: any){
        return req.clone({
            headers: req.headers.append('Authorization', 'Bearer ' + jwtToken)
        });
    }
}