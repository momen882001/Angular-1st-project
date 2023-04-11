import { Component } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css'],
})

export class ServerComponent {
  serverId: number = 1;
  serverMode: string = 'offline';

  getServerMode() : string {
    return this.serverMode;
  }
}
