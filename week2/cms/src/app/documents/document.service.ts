import { EventEmitter, Injectable } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS'
import { Subject } from 'rxjs'
import {HttpClient, HttpHeaders} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentSelectedEvent = new EventEmitter<Document>()
  // documentChangedEvent = new EventEmitter<Document[]>()
  documentListChangedEvent = new Subject<Document[]>()

  documents: Document[] = []
  maxDocumentId: number;

  constructor(private http: HttpClient) { 
    // this.documents = MOCKDOCUMENTS
    // this.maxDocumentId = this.getMaxId()
    this.http.get('https://wdd430-87992.firebaseio.com/documents.json').subscribe(
      (documents: Document[]) => {
        this.documents = documents
        this.maxDocumentId = this.getMaxId()
        this.documents.sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0)
        this.documentListChangedEvent.next(this.documents.slice())
      },
      (error: any) => {
        console.log(error)
      }
    )
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
    this.storeDocuments()
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
   this.storeDocuments()
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
   this.storeDocuments()
 }
 storeDocuments() {
   let documentsJson = JSON.stringify(this.documents)
   this.http.put('https://wdd430-87992.firebaseio.com/documents.json', documentsJson, {
     headers: new HttpHeaders({"Content-Type": "applications/json"}),
   }).subscribe(() => {
     this.documentListChangedEvent.next(this.documents.slice())
   })
 }
}
