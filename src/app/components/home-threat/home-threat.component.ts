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
  constructor(private homeService: HomeService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    
    this.homeService.multipleHome().subscribe({
      next: homes => {
        this.homes = homes;
        var flag = 0;
        for (let i = 0; i < this.homes.length; i++) {
          for (let j = 0; j < this.homes[i].members.length; j++) {
            if (this.homes[i].members[j].age > 60) {
              flag = 1;
              break;
            }
          }
          this.total += flag;
          flag = 0;
          this.totalHome = this.homes.length;
        }
      },
      error: err => this.errorMessage = err
    })
    
  }
}