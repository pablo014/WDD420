import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model'
@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [
    new Message('1', 'Test Subject', 'This is a test', 'Angelo Pablo'),
    new Message('2', 'Another Test', 'This is another test message', 'Mr. Sender'),
    new Message('3', 'Another Test', 'This is another test message', 'Mr. Sender')
  ]

  onAddMessage(message: Message) {
    this.messages.push(message)
  }

  constructor() { }

  ngOnInit(): void {
  }

}
