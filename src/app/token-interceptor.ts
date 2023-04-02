import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, Observable, switchMap, throwError, filter, take } from "rxjs";
import { LoginResponse } from "src/app/models/login-response.payload";
import { SharedService } from "./services/auth/shared/shared.service";

@Injectable({
    providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor{
    isRefresing = false;
    refreshToken : BehaviorSubject<any> = new BehaviorSubject(null);

    constructor(public sharedService : SharedService){

    }
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        req.headers.set('Content-Type', 'application/json; charset=utf-8');

        if(req.url.indexOf('refresh') !== -1 || req.url.indexOf('login') !== -1){
            return next.handle(req);
        }

        const jwtToken = this.sharedService.getJwtToken();
        
        if(jwtToken) {
            return next.handle(this.addToken(req, jwtToken)).pipe(catchError(error => {
                if(error instanceof HttpErrorResponse && (error.status === 403) ){
                    return this.handle403Error(req, next);
                }
                else{
                    return throwError(()=> new Error(error.error));
                }
            }))
        }

        return next.handle(req);
    }

    private handle403Error(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        if(!this.isRefresing){
            this.isRefresing = true;
            this.refreshToken.next(null);
            
            return this.sharedService.refreshToken().pipe(
                switchMap((refreshTokenResponse : LoginResponse) => {

                    this.isRefresing = false;
                    this.refreshToken.next(refreshTokenResponse.authToken);
                    
                    return next.handle(this.addToken(req, refreshTokenResponse.authToken));
                })
            )
        }else{
            return this.refreshToken.pipe(
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