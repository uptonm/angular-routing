import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
  server: { id: number; name: string; status: string };
  servers;

  constructor(private serversService: ServersService, private router: Router) {
    router.events.subscribe((val: NavigationEnd) => {
      if (val.url) {
      }
    });
  }

  ngOnInit() {
    this.server = this.serversService.getServer(1);
    this.servers = this.serversService.getServers();
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {
      name: this.server.name,
      status: this.server.status
    });
  }
}
