import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { ErrorActions } from '../../actions/error.actions';

@Component({
    selector: 'app',
    templateUrl: './app.component.html'
})
export class AppComponent {
    errorMessage$: Observable<any>;

    constructor(
        private store: Store<AppState>,
        private errorActions: ErrorActions)
    {
        this.errorMessage$ = store.select('error');
    }
}
