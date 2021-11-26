import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Socket } from 'ngx-socket-io';
import { Observable, Subscriber } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserService {

    constructor(private http: HttpClient, private socket: Socket) {
    }

    public newUser(user) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
        try {
            this.socket.emit('newUser', user);
            const data = new Observable((subscriber) => {
                this.socket.on('recieveChat', data => {
                    subscriber.next(data);
                });
            });
            return data;
        } catch {
            return;
        }
    }

}
