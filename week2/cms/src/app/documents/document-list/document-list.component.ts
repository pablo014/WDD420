import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {Document} from '../document.model'

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document('1', 'Doc 1', 'test document 1', 'testUrl1', null),
    new Document('2', 'Doc 2', 'test document 2', 'testUrl2', null),
    new Document('3', 'Doc 3', 'test document 3', 'testUrl3', null),
    new Document('4', 'Doc 4', 'test document 4', 'testUrl4', null),
  ]
  constructor() { }

  onSelectedDocument(document:Document) {
    this.selectedDocumentEvent.emit(document);
  }

  ngOnInit(): void {
  }

}
