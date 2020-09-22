import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cms-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  name = "Angelo";
  constructor() { }

  ngOnInit(): void {
  }

}
