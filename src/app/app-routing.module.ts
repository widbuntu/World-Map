import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MapComponent } from './map/map.component';
import { SourceComponent } from './source/source.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'map', component: MapComponent },
  { path: 'source', component: SourceComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
