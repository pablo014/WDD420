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
    this.http.get('http://localhost:3000/documents').subscribe(
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

    const pos = this.documents.findIndex(d => d.id === document.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http.delete('http://localhost:3000/documents/' + document.id)
      .subscribe(
        (response: Response) => {
          this.documents.splice(pos, 1);
          this.storeDocuments();
        }
      );
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
 addDocument(document: Document) {
  if (!document) {
    return;
  }

  // make sure id of the new Document is empty
  document.id = '';

  const headers = new HttpHeaders({'Content-Type': 'application/json'});

  // add to database
  this.http.post<{ message: string, document: Document }>('http://localhost:3000/documents',
    document,
    { headers: headers })
    .subscribe(
      (responseData) => {
        // add new document to documents
        this.documents.push(responseData.document);
        this.storeDocuments();
      }
    );
}
updateDocument(originalDocument: Document, newDocument: Document) {
  if (!originalDocument || !newDocument) {
    return;
  }

  const pos = this.documents.findIndex(d => d.id === originalDocument.id);

  if (pos < 0) {
    return;
  }

  // set the id of the new Document to the id of the old Document
  newDocument.id = originalDocument.id;
  newDocument._id = originalDocument._id;

  const headers = new HttpHeaders({'Content-Type': 'application/json'});

  // update database
  this.http.put('http://localhost:3000/documents/' + originalDocument.id,
    newDocument, { headers: headers })
    .subscribe(
      (response: Response) => {
        this.documents[pos] = newDocument;
        this.storeDocuments();
      }
    );
}
 storeDocuments() {
   let documentsJson = JSON.stringify(this.documents)
   this.http.put('http://localhost:3000/documents/', documentsJson, {
     headers: new HttpHeaders({"Content-Type": "applications/json"}),
   }).subscribe(() => {
     this.documentListChangedEvent.next(this.documents.slice())
   })
 }
}
