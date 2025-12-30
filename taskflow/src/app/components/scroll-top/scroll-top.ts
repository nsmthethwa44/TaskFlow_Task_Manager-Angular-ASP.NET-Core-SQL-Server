import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-scroll-top',
  imports: [CommonModule],
  templateUrl: './scroll-top.html',
  styleUrl: './scroll-top.scss',
})
export class ScrollTop {
 @Input() isVisible: boolean = false;

 scrollToTop(){
  window.scrollTo({top: 0, behavior: 'smooth'})
 }
}
