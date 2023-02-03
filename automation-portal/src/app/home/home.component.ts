import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    constructor(
        private authService: MsalService,
        private router: Router,) { }

    ngOnInit(): void {
        this.authService.handleRedirectObservable().subscribe({
            next: (result) => {},
            error: (error) => {}
        });

        this.router.navigate(["rule"]);
    }

}
