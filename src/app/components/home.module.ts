import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeAddComponent } from './home-add/home-add.component';
import { HomeComponent } from './home/home.component';
import { HomeDetailsComponent } from './home-details/home-details.component';
import { HomeThreatComponent } from './home-threat/home-threat.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { RouterModule } from '@angular/router';
import { HomeAddGuard } from '../guard/home-add.guard';
 
@NgModule({
  declarations: [
    HomeAddComponent,
    HomeComponent,
    HomeDetailsComponent,
    HomeThreatComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'threat',
        component: HomeThreatComponent,
      },
      {
        path: ':id',
        component: HomeDetailsComponent,
      },
      {
        path: ':id/add',
        component: HomeAddComponent,
        canDeactivate: [HomeAddGuard],
      },
    ])
  ]
})
export class HomeModule { }