import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { PostPageComponent } from './pages/post-page/post-page.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { MobileSearchComponent } from './pages/mobile-search/mobile-search.component';
import { ReccomendedPostsViewComponent } from './components/reccomended-posts-view/reccomended-posts-view.component';
import { UserPostsComponent } from './components/user-posts/user-posts.component';
import { SavedUserPostsComponent } from './components/saved-user-posts/saved-user-posts.component';
import { LikedUserPostsComponent } from './components/liked-user-posts/liked-user-posts.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '', component: HomeComponent,
    children:[
      {path: '', component: ReccomendedPostsViewComponent},
      {path: "search/:search", component: SearchPageComponent},
      {path: "mobile-search", component: MobileSearchComponent},
      {path: "post/:id", component: PostPageComponent},
    ]},
  {path: 'profile/:username', component: ProfileComponent, children: [
    {path: '', component: UserPostsComponent},
    {path: 'saved', component: SavedUserPostsComponent},
    {path: 'liked', component: LikedUserPostsComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
