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
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

//CLN: Added for debugging http headers issue in trip-data-services.ts
import { HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    TripListingComponent,
    TripCardComponent,
    AddTripComponent,
    EditTripComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    // CLN: added HttpClientModule for debugging http headers issue
    HttpClientModule,

    // CLN: added Forms and routing imports
    ReactiveFormsModule,
    // CLN: added FormsModule to troubleshoot error
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    TripDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
