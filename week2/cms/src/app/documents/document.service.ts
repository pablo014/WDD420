import { EventEmitter, Injectable } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS'
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentSelectedEvent = new EventEmitter<Document>()
  // documentChangedEvent = new EventEmitter<Document[]>()
  documentListChangedEvent = new Subject<Document[]>()

  documents: Document[] = []
  maxDocumentId: number;

  constructor() { 
    this.documents = MOCKDOCUMENTS
    this.maxDocumentId = this.getMaxId()
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
  deleteDocument(document: Document) {
    if (!document) {
       return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
       return;
    }
    this.documents.splice(pos, 1);
    this.documentListChangedEvent.next(this.documents.slice());
 }
 getMaxId(): number {
   var maxId = 0;
   let currentid: number
   for (let document of this.documents) {
     currentid =  parseInt(document.id)
     if (currentid > maxId) {
       maxId = currentid
     }
   }
   return maxId
 }
 addDocument(newDocument: Document) {
   if (newDocument == null || newDocument == undefined) {
     return
   }
   this.maxDocumentId++
   newDocument.id = this.maxDocumentId.toString()
   this.documents.push(newDocument)
   var documentsListClone = this.documents.slice()
   this.documentListChangedEvent.next(documentsListClone)
 }
 updateDocument(originalDocument: Document, newDocument: Document) {
   if(originalDocument == null || originalDocument == undefined || newDocument == undefined || newDocument == null) {
     return
   }
   var pos = this.documents.indexOf(originalDocument)
   if (pos < 0) {
     return
   }

   newDocument.id = originalDocument.id
   this.documents[pos] = newDocument
   var documentsListClone = this.documents.slice()
   this.documentListChangedEvent.next(documentsListClone)
 }
}
