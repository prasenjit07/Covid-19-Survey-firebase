import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Home, HomesResolved } from '../../models/home';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-home-threat',
  templateUrl: './home-threat.component.html',
  styleUrls: ['./home-threat.component.css']
})
export class HomeThreatComponent implements OnInit {

  homes: Home[] = [];
  errorMessage: string = '';
  total: number = 0;
  totalHome: number = 0;
  homes1: Home[];
  constructor(private homeService: HomeService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    
    this.homeService.Home().subscribe({
      next: homes1 => {
        this.homes1 = homes1;
        //console.log(homes1)
        var flag = 0;
        for (let i = 0; i < this.homes1.length; i++) {
          for (let j = 0; j < this.homes1[i].members.length; j++) {
            if (this.homes1[i].members[j].age > 60) {
              flag = 1;
              break;
            }
          }
          this.total += flag;
          flag = 0;
          this.totalHome = this.homes1.length;
        }
      },
      error: err => this.errorMessage = err
    })
    
  }
}