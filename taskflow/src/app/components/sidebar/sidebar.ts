import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Observable } from 'rxjs';
import { Auth } from '../../auth/services/auth';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { SidebarService } from '../../services/sidebar-service';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink, RouterModule, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar implements OnInit{
loggedInUser!: Observable<User | null>
private baseUrl = environment.apiUrl;

constructor(private authSer: Auth, private sidebarSer: SidebarService){}

ngOnInit(): void {
    this.loggedInUser = this.authSer.currentUser$;
}

getImageUrl(path: string | undefined): string{
  return path ? `${this.baseUrl}${path}` : "assets/img/img-1.jpg"
}

logOut(){
  this.authSer.logout();
}

closeSidebar(){
    this.sidebarSer.closeSidebar();
  }
}
