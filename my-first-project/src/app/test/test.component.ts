import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {

  buttonFlag = false;
  log : any = [];
toggleButton () {
this.buttonFlag = !this.buttonFlag;
// this.log.push(this.log.length + 1)
this.log.push(new Date())
}

}
