import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Socket } from 'ngx-socket-io';
import { Observable, Subscriber } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import * as messagingActions from '../../app/store/messaging/actions/messaging.actions';

@Injectable({
    providedIn: 'root',
})
export class MessagingService {

    constructor(private http: HttpClient, private socket: Socket) {
        this.listen();
    }


    public getChat(chatID) {
        console.log(chatID);
        this.socket.emit('getChat', { chat_id: chatID });

        const data = new Observable((subscriber) => {
            this.socket.on('chat', (data) => {
                subscriber.next(data);
            });
        });

        return data;
    }

    public getChats(squadID) {
        console.log("retrieving chats");
        this.socket.emit('getChats', squadID);

        const data = new Observable((subscriber) => {
            this.socket.on('chats', (data) => {
                subscriber.next(data);
            });
        });

        return data;
    }

    public sendMessage(message) {
        try {
            this.socket.emit('insertMessage', message);
            const data = new Observable((subscriber) => {
                this.socket.on('recieveChat', (data) => {
                    subscriber.next(data);
                });
            });
            return data;
        } catch {
            return Error;
        }
    }



    public newChat(chat) {
        console.log(chat);
        this.socket.emit('newChat', chat);
        const data = new Observable((subscriber) => {
            this.socket.on('newChatdResponse', (data) => {
                subscriber.next(data);
            });
        });

        return data;
    }


    private listen() {
        this.socket.on('chat', chat => {
            messagingActions.UpdateChat(chat);
        });
    }

}
