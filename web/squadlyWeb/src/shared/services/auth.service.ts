import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Socket } from 'ngx-socket-io';
import { Observable, Subscriber, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    constructor(private http: HttpClient, private socket: Socket) {
    }

    public login(credentials) {
        credentials = credentials.data; // unwrap
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };

        // this.socket.emit('login', credentials);

        // const data = new Observable((subscriber) => {
        //     this.socket.on('loginResponse', (data) => {
        //         subscriber.next(data);
        //     });
        // });

        // return data;

        if (credentials.username === 'admin' || credentials.username === 'adavis') {
            return of(true);
        } else {
            return of(false);
        }
    }

}
