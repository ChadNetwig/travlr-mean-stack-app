import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// CLN: added HttpModule
import { HttpModule } from '@angular/http';
// CLN: added ReactiveFormsModule
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
//CLN: added AppRoutingModule
import { AppRoutingModule } from './app-router.module';
import { TripListingComponent } from './trip-listing/trip-listing.component';
import { TripCardComponent } from './trip-card/trip-card.component';
//CLN: added TripDataService
import { TripDataService } from './services/trip-data.service';
import { AddTripComponent } from './add-trip/add-trip.component';
import { EditTripComponent } from './edit-trip/edit-trip.component';

@NgModule({
  declarations: [
    AppComponent,
    TripListingComponent,
    TripCardComponent,
    AddTripComponent,
    EditTripComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    // CLN: added Forms and routing imports
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    TripDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
