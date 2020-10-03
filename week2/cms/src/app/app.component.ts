import { Component } from '@angular/core';

@Component({
  selector: 'cms-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cms';
  currentView = 'Contacts';
  onNavigate(selectedView:string) {
    this.currentView = selectedView
  }
}
