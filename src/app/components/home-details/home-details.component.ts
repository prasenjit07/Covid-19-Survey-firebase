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
  home1:Home;
  //flag:any;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private homeService: HomeService) { }

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    //this.flag=param;
    this.getHome(param);
  }

  getHome(id: any): void{
    this.homeService.hom(id).subscribe({
      next: home1 => {
        this.home1 = home1
        //console.log('me'+this.home1)
      },
      error: err => this.errorMessage = err
    });
  }

  onBack(): void {
    this.router.navigate(['/home']);
  }

}