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
  homes1:Home[];
  constructor(private homeService: HomeService,private route:ActivatedRoute) {}
  
  ngOnInit(): void {
    this.homeService.Home().subscribe({
        next: homes1 => {
          this.homes1 = homes1;
          console.log(homes1)
        },
        error: err => this.errorMessage = err
    })
    
  }
  

}