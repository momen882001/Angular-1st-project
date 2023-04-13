import { Component } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css'],
})

export class ServerComponent {
  serverId: number = 1;
  serverMode: string = 'offline';
  serverStatus: string = "offline";

  constructor() {
    this.serverStatus = Math.random() > 0.5 ? "online" : "offline";
  }

  
  getServerMode() : string {
    return this.serverMode;
  }

  

  getColor() {
    return this.serverStatus === "online" ? "green" : "red";
  }
}
