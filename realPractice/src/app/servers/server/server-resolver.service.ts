import { Injectable } from '@angular/core';
import { ActivatedRoute, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ServersService } from '../servers.service';

interface Server {
    id: number;
    name: string;
    status: string;
}

@Injectable()
export class serverResolver implements Resolve<Server> {
    constructor(private serversService: ServersService){}

    resolve(route: ActivatedRoute, state: RouterStateSnapshot): Observable<Server> | Promise<Server> | Server {
        return this.serversService.getServer(+route.params['id']);
    } 
}