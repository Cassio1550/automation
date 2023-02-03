import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { tap } from 'rxjs/operators';
import { auth } from 'src/environments/environment';

import { LoadingService } from './loading.service';

@Injectable({
    providedIn: 'root'
})
export class GatewayService {
    url = auth.resources.todoListApi.resourceUri;

    constructor(
        private http: HttpClient,
        private loading: LoadingService,
    ) { }

    get<T>(path: any = "", options?: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe?: 'body';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
    }): Observable<T> {
        this.loading.show();
        return this.http.get<T>(this.url + '/' + path, options)
            .pipe(
                tap(
                    next => { },
                    error => this.loading.hide(),
                    () => this.loading.hide(),
                )
            );
    }

    post<T>(path: any, body: any | null, options?: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe?: 'body';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
    }): Observable<T> {
        this.loading.show();
        return this.http.post<T>(this.url + '/' + path, body, options)
            .pipe(
                tap(
                    next => { },
                    error => this.loading.hide(),
                    () => this.loading.hide(),
                )
            );
    }

    delete(path: any, options?: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe?: 'body';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
    }): Observable<Object> {
        this.loading.show();
        return this.http.delete(this.url + '/' + path, options)
            .pipe(
                tap(
                    next => { },
                    error => this.loading.hide(),
                    () => this.loading.hide(),
                )
            );
    }

    put<T>(path: any, body: any | null, options?: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe?: 'body';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
    }): Observable<T> {
        this.loading.show();
        return this.http.put<T>(this.url + '/' + path, body, options)
            .pipe(
                tap(
                    next => { },
                    error => this.loading.hide(),
                    () => this.loading.hide(),
                )
            );
    }

    download(path: any): Observable<HttpResponse<Blob>> {
        this.loading.show();
        return this.http.get(this.url + '/' + path, { observe: 'response', responseType: 'blob' })
            .pipe(
                tap(
                    next => {
                        let filename = "";
                        let disposition = next.headers.get('Content-Disposition');
                        if (disposition && disposition.indexOf('attachment') !== -1) {
                            let filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                            let matches = filenameRegex.exec(disposition);
                            if (matches != null && matches[1])
                                filename = matches[1].replace(/['"]/g, '');
                        }
                        const element = document.createElement('a');
                        element.href = URL.createObjectURL(next.body);
                        element.download = filename;
                        document.body.appendChild(element);
                        element.click();
                        document.body.removeChild(element);
                    },
                    error => this.loading.hide(),
                    () => this.loading.hide(),
                )
            );
    }
}
