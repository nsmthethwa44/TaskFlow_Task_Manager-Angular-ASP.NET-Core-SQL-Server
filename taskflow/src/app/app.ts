import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ScrollTop } from "./components/scroll-top/scroll-top";
import { NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Router } from '@angular/router';
import { Preloader } from "./components/preloader/preloader";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ScrollTop, Preloader],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'TaskFlow - Task Management';

  isVisible = false;
  isLoading = false;

    constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
         this.isLoading = true;
      }else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        setTimeout(() =>{
          this.isLoading = false;
        }, 5000)
      }
    });
  }

  ngOnInit(): void {
    window.onscroll = () =>{
      if(window.scrollY > 2){
        this.isVisible = true;
      }else{
        this.isVisible = false;
      }
    }
  }
}
