import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { stringify } from 'querystring';
import { Message } from '../message.model'
@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subject', {static: true}) subjectRef: ElementRef;
  @ViewChild('msgText', {static: true}) msgTextRef: ElementRef;
  @Output() addMessage = new EventEmitter<Message>();
  
  
  onSendMessage() {
    let sender = 'Angelo Pablo'
    const newSubject = this.subjectRef.nativeElement.value;
    const newMsg = this.msgTextRef.nativeElement.value;
    const newMessage = new Message('1', newSubject, newMsg, sender)
    this.addMessage.emit(newMessage)
  }
  onClear() {
    this.subjectRef.nativeElement.value = '';
    this.msgTextRef.nativeElement.value = '';
  }
  constructor() { }

  ngOnInit(): void {
  }

}
