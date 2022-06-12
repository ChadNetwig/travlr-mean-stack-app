import { Component, OnInit, Input } from '@angular/core';
// CLN: Added Angular Router and Trip model (schema for MongoDB)
import { Router } from "@angular/router"
import { Trip } from '../models/trip';

@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css']
})
export class TripCardComponent implements OnInit {

  @Input('trip') trip:any;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  private editTrip(trip: Trip): void {
    console.log('Inside TripListingComponent#editTrip');
    localStorage.removeItem("tripCode");
    localStorage.setItem("tripCode", trip.code);
    this.router.navigate(['edit-trip']);
  }

}
