import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Home,HomeResolved } from '../../models/home';
import {HomeService} from '../../services/home.service'

@Component({
  selector: 'app-home-details',
  templateUrl: './home-details.component.html',
  styleUrls: ['./home-details.component.css']
})
export class HomeDetailsComponent implements OnInit {

  errorMessage = '';
  home:Home;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private homeService: HomeService) { }

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    this.getHome(param);
  }

  getHome(id: any): void{
    this.homeService.singleHome(id).subscribe({
      next: home => {
        this.home = home;
      },
      error: err => this.errorMessage = err
    });
  }

  onBack(): void {
    this.router.navigate(['/home']);
  }

}