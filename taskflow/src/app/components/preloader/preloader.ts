import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-preloader',
  imports: [CommonModule],
  templateUrl: './preloader.html',
  styleUrl: './preloader.scss',
})
export class Preloader {
@Input() isLoading = false;
}
