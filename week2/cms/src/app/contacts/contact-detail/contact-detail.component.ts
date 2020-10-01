import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../contact.model'
@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {

  contact: Contact = new Contact('1', 'R. Kent Jackson', 'jacksonk@byui.edu', '208-496-3771', 'https://web.byui.edu/Directory/Employee/jacksonk.jpg', null);


  constructor() { }

  ngOnInit(): void {
  }

}
