import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { NewsListComponent } from './news-list/news-list.component';

export const routes: Routes = [
 // { path: 'my-events', component: MyEventsComponent }
 //{ path: 'create-event', component: CreateEventComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: AdminDashboardComponent },
  { path: 'news', component: NewsListComponent },
  {
    path: 'add-article',
    loadComponent: () => import('./articles/add-article.component').then(m => m.AddArticleComponent)
  }
];
