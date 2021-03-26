import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Home } from '../models/home';
import { AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class HomeService {

  constructor(private http: HttpClient, private store: AngularFirestore) { }

  multipleHome(): Observable<Home[]> {
    return this.store.collection('home').valueChanges({ idField: 'id' });
  }

  singleHome(id: any): Observable<Home> {
    return this.store.doc<Home>('home/' + id).valueChanges({ idField: 'id' });
  }

  createHome(home: any) {
    return this.store.collection('home').add(home);
  }


  deleteHome(home: Home) {
    return this.store.collection('home').doc(home.id).delete();
  }

  updateHome(home: any) {
    return this.store.collection("home").doc(home.id).update(home);
  }
}