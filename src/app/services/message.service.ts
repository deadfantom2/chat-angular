import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private urlPostSendMessage = environment.url + 'api/chatapp/chat-message/';

  constructor( private http: HttpClient ) { }


  sendMessage(sender_id, receiver_id, receiveName, message): Observable<any> {
    return this.http.post(this.urlPostSendMessage + sender_id + '/' + receiver_id, {
      receiver_id,
      receiveName,
      message
    })
  }

}
