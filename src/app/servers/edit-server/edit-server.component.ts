import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServersService } from '../servers.service';
import { Router, NavigationEnd, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, OnDestroy {
  server: { id: number; name: string; status: string } = {
    id: 0,
    name: 'Loading',
    status: 'See name'
  };
  sub: any;

  constructor(
    private serversService: ServersService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    router.events.subscribe((val: NavigationEnd) => {
      if (val.url) {
      }
    });
  }

  ngOnInit() {
    const id = +this.route.snapshot.params['id'] - 1;
    this.server = this.serversService.getServer(id);
    this.sub = this.route.params.subscribe((params: Params) => {
      this.server = this.serversService.getServer(+params['id']);
    });
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {
      name: this.server.name,
      status: this.server.status
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
