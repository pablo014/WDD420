import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import {Document} from '../document.model'
import {DocumentService} from '../document.service'

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy {
  // @Output() selectedDocumentEvent = new EventEmitter<Document>();
  subscription: Subscription

  documents: Document[] = []
  constructor(private documentService: DocumentService) { }


  ngOnInit(): void {
    this.documents = this.documentService.getContacts()
    console.log(this.documents)
    this.subscription = this.documentService.documentListChangedEvent.subscribe((documents:Document[])=> {
      this.documents = documents
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
