import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Home } from '../models/home';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})

export class HomeService {

  private homeUrl = 'api/homes';
  hi: Observable<Home[]>;
  hom1: Observable<Home>;
  homeCollection: AngularFirestoreCollection<Home>;
  homeDoc:AngularFirestoreDocument<Home>;
  constructor(private http: HttpClient, private store: AngularFirestore) {
    this.hi = this.store.collection('home').valueChanges({ idField: 'id' });

  }

  Home() {
    return this.hi;
  }

  hom(id: any): Observable<Home>{
    //console.log(id);
    // if (+id === 0) {
    //   return of(this.initializeProduct());
    // }
    // const homeData = this.store.doc<Home>('home/'+id);
    // return homeData.snapshotChanges()
    //   .pipe(
    //     map(changes => {
    //       const data = changes.payload.data();
    //       data.id=id;
    //       //console.log(data);
    //       return data;
    //     })
    //     //,catchError(this.handleError)
    //   )
    return this.store.doc<Home>('home/'+id).valueChanges({ idField: 'id' });
  }

  // getHomes(): Observable<Home[]> {
  //   return this.http.get<Home[]>(this.homeUrl)
  //     .pipe(
  //       tap(data => JSON.stringify(data)),
  //       catchError(this.handleError)
  //     );
  // }

  // getHome(id:any): Observable<any> {
  //   if (+id === 0) {
  //     return of(this.initializeProduct());
  //   }
  //   const url = `${this.homeUrl}/${id}`;
  //   return this.http.get<any>(url)
  //     .pipe(
  //       tap(data => JSON.stringify(data)),
  //       catchError(this.handleError)
  //     );
  // }

  createHome(home: any){
    //const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    //home.id = null;
    this.store.collection('home').add(home);
    //this.homeCollection.add(home);
    // return this.http.post<any>(this.homeUrl, home, { headers })
    //   .pipe(
    //     tap(data => 'createHome: ' + JSON.stringify(data)),
    //     catchError(this.handleError)
    //   );
  }

  deleteMember(home:Home){
    
  }
  deleteHome(home: Home){
    this.homeDoc=this.store.doc(`home/${home.id}`);
    this.homeDoc.delete();
  }

  updateHome(home: any){
    this.homeDoc=this.store.doc(`home/${home.id}`);
    this.homeDoc.update(home);
  }


  // private handleError(err: HttpErrorResponse): Observable<never> {
  //   // in a real world app, we may send the server to some remote logging infrastructure
  //   // instead of just logging it to the console
  //   let errorMessage = '';
  //   if (err.error instanceof ErrorEvent) {
  //     // A client-side or network error occurred. Handle it accordingly.
  //     errorMessage = `An error occurred: ${err.error.message}`;
  //   } else {
  //     // The backend returned an unsuccessful response code.
  //     // The response body may contain clues as to what went wrong,
  //     errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
  //   }
  //   console.error(errorMessage);
  //   return throwError(errorMessage);
  // }


  private initializeProduct(): any {
    // Return an initialized object
    return {
      id: null,
      houseNumber: '',
      houseAddress: '',
      // member: [{
      //   name: '',
      //   gender: '',
      //   age: ''
      // }]
    };
  }
}