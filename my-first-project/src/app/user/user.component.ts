import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent {
  inputText : string = ''
  addingUser : string = "User need to be added"
  allowUser : boolean = false;
  constructor() {
    setTimeout(() => {
      this.allowUser = true;
    },2000)
  }

  onCreatingUser() : void {
    this.addingUser = "user added successfully"
  }

  handlingUpdating(event : Event) : void  {
    this.inputText = (<HTMLInputElement>event.target).value
  }

}
