import { EventEmitter, Injectable } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS'

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentSelectedEvent = new EventEmitter<Document>()
  documents: Document[] = []
  constructor() { 
    this.documents = MOCKDOCUMENTS
  }
  getContacts() {
    return this.documents.slice()
  }
  getContact(id:string) {
    for (let document of this.documents) {
      if(document.id == id) {
        return document
      }
    }
    return null
  }
}
