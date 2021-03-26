import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'
import { Observable, Subscription } from 'rxjs';
import { Home } from '../../models/home';
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
        if (id === '0') {
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

  

  getHome(id: any): void {
    this.homeService.singleHome(id)
      .subscribe({
        next: (home) => {
          this.displayHome(home)
        },
        error: err => this.errorMessage = err
      });
  }

  displayHome(home: any): void {
    if (this.houseForm) {
      this.houseForm.reset();
    }

    this.home = home;
    if (this.home.id === '0') {
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
  }

  buildMember(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(32)]],
      gender: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.pattern("^[0-9]*$")]]
    })
  }

  createFormArrayWithMembers(members: any[]) {
    if(members)
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
    if (this.home.id === '0') {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the home: ${this.home.houseAddress}?`)) {
        this.homeService.deleteHome(this.home).
        then(() => {
          console.log("Document successfully deleted!");
          this.onSaveComplete();
        }).catch((error) => {
          console.error("Error removing document: ", error);
        });
        
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
        if (p.id === '0') {
          this.homeService.createHome(p)
            .then(() => {
              console.log("Done");
              this.onSaveComplete();
            })
            .catch((error) => {
              console.error("Error: ", error);
            });
        } else {
          this.homeService.updateHome(p)
            .then(() => {
              console.log("Update successfull!");
              this.onSaveComplete();
            })
            .catch((error) => {
              console.error("Error: ", error);
            });
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