import { Injectable } from '@angular/core';
import { Observable, of, Subject, timer } from 'rxjs';
import { debounce } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {
    private state = new Subject<boolean>();
    loading: boolean = false;
    debounced: Observable<boolean>;
    pending: boolean = false;
    constructor(
    ) {
        this.debounced = this.state.pipe(debounce(() => timer(300)));
        this.debounced.subscribe(val => {
            if (this.pending) {
                this.loading = val;
                this.pending = false;
            }
        });
    }

    show(): void {
        this.pending = true;
        this.setLoading(true);
    }

    hide(): void {
        this.pending = false;
        this.loading = false;
    }

    setLoading(value: boolean): void {
        this.state.next(value);
    }
}
