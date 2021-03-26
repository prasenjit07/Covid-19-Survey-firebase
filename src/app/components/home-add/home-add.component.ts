// import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormBuilder, Validators, FormArray, } from '@angular/forms';
// import { Router, ActivatedRoute } from '@angular/router'
// import { Subscription } from 'rxjs';
// import { Home, HomeResolved } from '../../models/home';
// import { HomeService } from '../../services/home.service';

// @Component({
//   selector: 'app-home-add',
//   templateUrl: './home-add.component.html',
//   styleUrls: ['./home-add.component.css']
// })
// export class HomeAddComponent implements OnInit {

//   pageTitle = 'Home Edit';
//   errorMessage: string;
//   home: Home;
//   private sub: Subscription;
//   houseForm: FormGroup;
//   constructor(private fb: FormBuilder,
//     private router: Router,
//     private route: ActivatedRoute,
//     private homeService: HomeService) { }

//   get membersFormArray(): FormArray {
//     return this.houseForm.get('members') as FormArray;
//   }

//   ngOnInit() {
//     this.houseForm = this.fb.group({
//       houseNumber: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
//       houseAddress: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(40)]],
//       members: this.fb.array([])
//     });
//     this.sub = this.route.paramMap.subscribe(
//       params => {
//         const id = params.get('id');
//         this.getHome(id);
//         if (+id === 0) {
//           this.addMember();
//         }
//       }
//     );
//   }
  
//   ngOnDestroy(): void {
//     this.sub.unsubscribe();
//   }

//   addMember(): void {
//     this.membersFormArray.push(this.buildMember());
//   }

//   buildMember(): FormGroup {
//     return this.fb.group({
//       name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(32)]],
//       gender: ['', [Validators.required]],
//       age: ['', [Validators.required, Validators.pattern("^[0-9]*$")]]
//     })
//   }

//   getHome(id: any): void {
//     this.homeService.getHome(id)
//       .subscribe({
//         next: (home) => this.displayHome(home),
//         error: err => this.errorMessage = err
//       });
//   }

//   displayHome(home: any): void {
//     if (this.houseForm) {
//       this.houseForm.reset();
//     }

//     this.home = home;
//     //console.log(this.home);
//     if (this.home.id === 0) {
//       this.pageTitle = 'Add Home';
//     } else {
//       this.pageTitle = `Edit Home: ${this.home.houseAddress}`;
//       this.createFormArrayWithMembers(this.home.members);
//     }

//     // Update the data on the form
//     this.houseForm.patchValue({
//       houseNumber: this.home.houseNumber,
//       houseAddress: this.home.houseAddress,
//     });


//     //this.houseForm.setControl('members', this.createFormArrayWithMembers(this.home.members));
//   }


//   createFormArrayWithMembers(members: any[]) {
//     //let tempMembersFormArray: FormArray;

//     members.forEach(member => {
//       this.membersFormArray.push(
//         this.fb.group({
//           name: [member.name, [Validators.required, Validators.minLength(3), Validators.maxLength(32)]],
//           gender: [member.gender, [Validators.required]],
//           age: [member.age, [Validators.required, Validators.pattern("^[0-9]*$")]]
//         }));
//     });
//   }


//   deleteHome(): void {
//     if (this.home.id === 0) {
//       // Don't delete, it was never saved.
//       this.onSaveComplete();
//     } else {
//       if (confirm(`Really delete the home: ${this.home.houseAddress}?`)) {
//         this.homeService.deleteProduct(this.home.id)
//           .subscribe({
//             next: () => this.onSaveComplete(),
//             error: err => this.errorMessage = err
//           });
//       }
//     }
//   }

//   deleteMember(index: number): void {
//     this.membersFormArray.removeAt(index);
//     this.membersFormArray.markAsDirty();
//   }

//   save(): void {
//     if (this.houseForm.valid) {
//       if (this.houseForm.dirty) {
//         const p = { ...this.home, ...this.houseForm.value };

//         if (p.id === 0) {
//           this.homeService.createHome(p)
//             .subscribe({
//               next: () => this.onSaveComplete(),
//               error: err => this.errorMessage = err
//             });
//         } else {
//           this.homeService.updateHome(p)
//             .subscribe({
//               next: () => this.onSaveComplete(),
//               error: err => this.errorMessage = err
//             });
//         }
//       } else {
//         this.onSaveComplete();
//       }
//     } else {
//       this.errorMessage = 'Please correct the validation errors.';
//     }
//   }

//   onSaveComplete(): void {
//     // Reset the form to clear the flags
//     this.houseForm.reset();
//     this.router.navigate(['/home']);
//   }
  
  
// }
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'
import { Observable, Subscription } from 'rxjs';
import { Home, HomeResolved } from '../../models/home';
import { HomeService } from '../../services/home.service';


@Component({
  selector: 'app-home-add',
  templateUrl: './home-add.component.html',
  styleUrls: ['./home-add.component.css']
})
export class HomeAddComponent implements OnInit {

  pageTitle = 'Home Edit';
  errorMessage: string;
  home: Home;
  private sub: Subscription;
  houseForm: FormGroup;
  constructor(private fb: FormBuilder, 
    private router: Router, 
    private route: ActivatedRoute, 
    private homeService: HomeService) { }

  get membersFormArray(): FormArray {
    return this.houseForm.get('members') as FormArray;
  }

  ngOnInit() {
    this.houseForm = this.fb.group({
      houseNumber: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      houseAddress: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(40)]],
      members: this.fb.array([])
    });
    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        this.getHome(id);
        if(+id === 0){
          this.addMember();
        }
      }
    );
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  addMember(): void {
    this.membersFormArray.push(this.buildMember());
  }

  buildMember(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(32)]],
      gender: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.pattern("^[0-9]*$")]]
    })
  }

  getHome(id: any): void {
    this.homeService.hom(id)
      .subscribe({
        next: (home) =>{
           this.displayHome(home);
          console.log(home)},
        error: err => this.errorMessage = err
      });
  }

  displayHome(home: any): void {
    if (this.houseForm) {
      this.houseForm.reset();
    }

    this.home = home;
    console.log(this.home);
    if (this.home.id === null) {
      this.pageTitle = 'Add Home';
    } else {
      this.pageTitle = `Edit Home: ${this.home.houseAddress}`;
      this.createFormArrayWithMembers(this.home.members);
    }

    // Update the data on the form
    this.houseForm.patchValue({
      houseNumber: this.home.houseNumber,
      houseAddress: this.home.houseAddress,
    });

    
    //this.houseForm.setControl('members', this.createFormArrayWithMembers(this.home.members));
  }


  createFormArrayWithMembers(members: any[]) {
    //let tempMembersFormArray: FormArray;

    members.forEach(member => {
      this.membersFormArray.push(
        this.fb.group({
          name: [member.name, [Validators.required, Validators.minLength(3), Validators.maxLength(32)]],
          gender: [member.gender, [Validators.required]],
          age: [member.age, [Validators.required, Validators.pattern("^[0-9]*$")]]
        })
      );
    });
  }


  deleteHome(): void {
    if (this.home.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the home: ${this.home.houseAddress}?`)) {
        this.homeService.deleteHome(this.home);
        this.onSaveComplete() ;
      }
    }
  }

  deleteMember(index: number): void {
      this.membersFormArray.removeAt(index);
      this.membersFormArray.markAsDirty();
  }

  save(): void {
    if (this.houseForm.valid) {
      if (this.houseForm.dirty) {
        const p = { ...this.home, ...this.houseForm.value };
        console.log('hi',p);
      
        if (p.id === null) {
          this.homeService.createHome(p);
            this.onSaveComplete();
            console.log('him')
        } else {
          this.homeService.updateHome(p);
            this.onSaveComplete();     
        }
      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.houseForm.reset();
    this.router.navigate(['/home']);
  }
}