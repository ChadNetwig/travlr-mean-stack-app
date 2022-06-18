import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TripListingComponent } from './trip-listing/trip-listing.component';
import { AddTripComponent } from './add-trip/add-trip.component';
//CLN: Added EditTripComponent for routing
import { EditTripComponent } from './edit-trip/edit-trip.component';
//CLN: Added LoginComponent
import { LoginComponent } from './login/login.component';
//CLN: Added HomeComponent for landing page
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    { path: 'add-trip', component: AddTripComponent },
    { path: 'edit-trip', component: EditTripComponent },
    { path: 'login', component: LoginComponent },
    { path: 'list-trips', component: TripListingComponent },
    { path: '', component: HomeComponent, pathMatch: 'full' }
    //{ path: '', component: TripListingComponent, pathMatch: 'full' }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
