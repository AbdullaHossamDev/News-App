import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsComponent } from './components/news/news.component';
import { AuthGuardGuard } from './services/authGuard/auth-guard.guard';


const routes: Routes = [
  {
    path: '', redirectTo: 'home/news', pathMatch: 'full'
  },
  {
    path: 'home', redirectTo: 'home/news', pathMatch: 'full'
  },
  {
    path: 'home/:status', component: NewsComponent
  },
  {
    path: 'home/favorites', component:NewsComponent, canActivate:[AuthGuardGuard]
  }
  ,
  {
    path: '**', redirectTo:'home/news', pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
