import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Contact} from '../contact.model'
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  contact: Contact
  groupContacts: Contact[] = []
  originalContact: Contact
  editMode: boolean = false
  id: string
  constructor(private contactService: ContactService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params.id
      if(this.id == null || this.id == undefined) {
        this.editMode = false
        return
      }
      this.originalContact = this.contactService.getContact(this.id)
      if (this.originalContact == undefined || this.originalContact == null) {
        return
      }
      this.editMode = true
      this.contact = JSON.parse(JSON.stringify(this.originalContact))
    })
  }
  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route})
  }
  onRemoveItem(index: number){
    
  }

  test(valid){
    console.log(valid)
  }
  onSubmit(form:NgForm){
    console.log('hello')
    let value = form.value
    let newContact = new Contact(this.id, value['name'], value['email'], value['phone'], value['imageUrl'], null)
    if (this.editMode){
      this.contactService.updateContact(this.originalContact, newContact)
    }
    else {
      this.contactService.addContact(newContact)
    }
    this.onCancel()
  }

}
