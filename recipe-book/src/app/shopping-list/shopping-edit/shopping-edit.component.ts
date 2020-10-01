import { Component, ElementRef, EventEmitter, OnInit, ViewChild, Output } from '@angular/core';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput') nameInputRef:ElementRef;
  @ViewChild('amountInput') amountInputRef: ElementRef;
  @Output() ingredientAdded = new EventEmitter<{name:string, amount:number}>();
  constructor() { }

  onAddItem() {
    const ingName = this.nameInputRef.nativeElement.value
    const ingAmount = this.amountInputRef.nativeElement.value
    const newIngredient = {name: ingName , amount: ingAmount}
    this.ingredientAdded.emit(newIngredient)
  }

  ngOnInit(): void {
  }

}
