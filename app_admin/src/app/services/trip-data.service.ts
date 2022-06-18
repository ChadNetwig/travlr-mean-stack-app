import { Injectable, Inject } from '@angular/core';
//import { Http } from '@angular/http';
import { Trip } from '../models/trip';

// CLN: Added authentication imports
import { User } from '../models/user';
import { AuthResponse } from '../models/authresponse';
import { BROWSER_STORAGE } from '../storage';

// CLN: Added current HttpClient and HttpHeaders to replace deprecated Http
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class TripDataService {

  constructor(private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage) { }

  private apiBaseUrl = 'http://localhost:3000/api/';
  // CLN: added tripURL var
  private tripUrl = `${this.apiBaseUrl}trips/`;

  // CLN: Added function to add trips
  public addTrip(formData: Trip): Promise<Trip> {
    console.log('Inside TripDataService#addTrip');

    return this.http
      .post(this.tripUrl, formData, {
        // CLN: Added HttpHeaders for authentication
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("travlr-token")}`
        })
      })
      //.post(this.tripUrl, formData, { headers: headers })  // passes form data in request body with HTTP POST
      .toPromise()
      .then(response => response as Trip[])
      .catch(this.handleError);
  }

  // CLN: Added getTrip
  public getTrip(tripCode: string): Promise<Trip> {
    console.log('Inside TripDataService#getTrip(tripCode)');
    return this.http
      .get(this.tripUrl + tripCode)
      .toPromise()
      .then(response => response as Trip)
      .catch(this.handleError);
  }

  public getTrips(): Promise<Trip[]> {
    console.log('Inside TripDataService#getTrips');
    return this.http
      //.get(`${this.apiBaseUrl}trips`)
      .get(this.tripUrl)
      .toPromise()
      .then(response => response as Trip[])
      .catch(this.handleError);
  }

  //CLN: Added updateTrip
  public updateTrip(formData: Trip): Promise<Trip> {
    console.log('Inside TripDataService#updateTrip');
    console.log(formData);
   
    return this.http
      .put(this.tripUrl + formData.code, formData, {
        // CLN: Added HttpHeaders for authentication
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("travlr-token")}`
        })
      })
      .toPromise()
      .then(response => response as Trip[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }

  // CLN: Added login, register, and MakAuthApiCall methods for front-end SPA auth calls to backend APIs
  public login(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('login', user);
   }

   public register(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('register', user);
   }

   private makeAuthApiCall(urlPath: string, user: User): Promise<AuthResponse> {
    const url: string = `${this.apiBaseUrl}/${urlPath}`;
    return this.http
      .post(url, user)
      .toPromise()
      .then(response => response as AuthResponse)
      .catch(this.handleError);
   }
}