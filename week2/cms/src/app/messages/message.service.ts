import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import {Message} from './message.model'
import {MOCKMESSAGES} from './MOCKMESSAGES'

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  maxMessageId: number;
  messageAdded = new EventEmitter<Message[]>();
  messages: Message[] = []
  constructor(private http: HttpClient) {
    this.httpGetMessages()
   }

   httpGetMessages() {
    this.http.get('https://wdd430-87992.firebaseio.com/messages.json').subscribe(
      (messages: Message[]) => {
        this.messages = messages
        this.maxMessageId = this.getMaxId()
        this.messages.sort((a, b) => a.id > b.id ? 1 : b.id > a.id ? -1 : 0)
        this.messageAdded.emit(this.messages.slice())
      },
      (error: any) => {
        console.log(error)
      }
    )
   }
   storeMessages() {
    let messagesJson = JSON.stringify(this.messages)
   this.http.put('https://wdd430-87992.firebaseio.com/messages.json', messagesJson, {
     headers: new HttpHeaders({"Content-Type": "applications/json"}),
   }).subscribe(() => {
     this.messageAdded.emit(this.messages.slice())
   })
   }

   getMaxId() {
    var maxId = 0;
    let currentid: number
    for (let message of this.messages) {
      currentid =  parseInt(message.id)
      if (currentid > maxId) {
        maxId = currentid
      }
    }
    return maxId
   }
   getMessages() {
    return this.messages.slice()
   }
   getMessage(id: string) {
    for(let message of this.messages) {
      if(message.id == id) {
        return message
      }
    }
    return null
   }
   addMessage(message: Message) {
    this.messages.push(message)
    this.storeMessages()
   }
}
