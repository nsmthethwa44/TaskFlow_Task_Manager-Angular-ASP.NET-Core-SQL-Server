import { Component } from '@angular/core';
import { Sidebar } from "../../components/sidebar/sidebar";
import { Header } from "../../components/header/header";
import { RouterOutlet } from "@angular/router";
import { Copyright } from "../../components/copyright/copyright";


@Component({
  selector: 'app-dashboard',
  imports: [Sidebar, Header, RouterOutlet, Copyright,],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {

}
