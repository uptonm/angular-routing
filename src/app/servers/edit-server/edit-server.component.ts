import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServersService } from '../servers.service';
import { Router, NavigationEnd, ActivatedRoute, Params } from '@angular/router';
import { CanComponentDeactivate } from './canDeactivate.guard';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent
  implements OnInit, OnDestroy, CanComponentDeactivate {
  server: { id: number; name: string; status: string } = {
    id: 0,
    name: 'Loading',
    status: 'See name'
  };
  sub: any;
  subQuery: any;
  allowEdit: Boolean = false;
  changesSaved: Boolean = false;
  serverName: string;
  serverStatus: string;

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
      name: this.serverName,
      status: this.serverStatus
    });
    this.changesSaved = true;
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.subQuery.unsubscribe();
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.allowEdit) {
      return true;
    }
    if (
      (this.server.name !== this.serverName ||
        this.server.status !== this.serverStatus) &&
      !this.changesSaved
    ) {
      return confirm('Are you sure you want to leave without saving changes?');
    } else {
      return true;
    }
  }
}
