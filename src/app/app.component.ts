import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { v4 } from 'uuid';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    constructor(private router: Router) { }

    ngOnInit(): void {
        const id = v4();
        this.router.navigate([id]);
    }
}
