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
  subQuery: any;
  allowEdit: Boolean = false;

  constructor(
    private serversService: ServersService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = +this.route.snapshot.params['id'] - 1;
    this.allowEdit = +this.route.snapshot.queryParams['allowEdit'] === 1;
    console.log(this.allowEdit);
    this.server = this.serversService.getServer(id);

    this.sub = this.route.params.subscribe((params: Params) => {
      this.server = this.serversService.getServer(+params['id']);
    });

    this.subQuery = this.route.queryParams.subscribe((queryParams: Params) => {
      this.allowEdit = +queryParams['allowEdit'] === 1;
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
    this.subQuery.unsubscribe();
  }
}
