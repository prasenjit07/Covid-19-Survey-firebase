import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Home,  HomesResolved } from '../../models/home';
import {HomeService} from '../../services/home.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  errorMessage:string='';
  homes:Home[];
  constructor(private homeService: HomeService,private route:ActivatedRoute) {}
  
  ngOnInit(): void {
    this.homeService.multipleHome().subscribe({
        next: homes => {
          this.homes = homes;
        },
        error: err => this.errorMessage = err
    }) 
  }
}