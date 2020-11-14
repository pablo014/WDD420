import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact.model';

@Pipe({
  name: 'contactsFilter'
})
export class ContactsFilterPipe implements PipeTransform {

  transform(contacts: Contact[], term: string): any {
    let filteredContacts: Contact[] = []
    for (const contact of contacts) {
      if(contact.name.toLowerCase().includes(term)){
        filteredContacts.push(contact)
      }
    }
    if (filteredContacts.length == 0) {
      return contacts
    }
    
    return filteredContacts;
  }

}
