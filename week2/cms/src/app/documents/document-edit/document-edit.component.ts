import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DocumentService } from '../document.service';
import {Document} from '../document.model'

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {

  originalDocument: Document
  document: Document
  editMode: boolean = false
  id: string

  constructor(private documentService: DocumentService, 
    private router: Router, 
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=> {
      this.id = params.id;
      if (this.id == undefined || this.id == null) {
        this.editMode = false
        return
      }
      this.originalDocument = this.documentService.getContact(this.id)

      if(this.originalDocument == null || this.originalDocument == undefined) {
        return
      }
      this.editMode = true
      this.document = JSON.parse(JSON.stringify(this.originalDocument))
    })
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  onSubmit(form: NgForm) {
    
    let value = form.value
    let newDocument = new Document(this.id, value['name'], value['description'], value['url'], null)
    if (this.editMode){
      this.documentService.updateDocument(this.originalDocument, newDocument)
    }
    else {
      this.documentService.addDocument(newDocument)
    }
    this.onCancel()
  }

}
