import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AppRoutingModule} from './app-routing.module'

import { AppComponent } from './app.component';
import { ChoresComponent } from './chores/chores.component';
import { ChoresListComponent } from './chores/chores-list/chores-list.component';
import { ChoresItemComponent } from './chores/chores-item/chores-item.component';
import { ChoresEditComponent } from './chores/chores-edit/chores-edit.component';
import { ChoresDetailsComponent } from './chores/chores-details/chores-details.component';
import {HttpClientModule} from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    ChoresComponent,
    ChoresListComponent,
    ChoresItemComponent,
    ChoresEditComponent,
    ChoresDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
