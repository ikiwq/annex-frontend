import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { PostPageComponent } from './pages/post-page/post-page.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';
import { UserPostsComponent } from './components/user-posts/user-posts.component'
import { UserLikedComponent } from './components/user-liked/user-liked.component';
import { UserSavedComponent } from './components/user-saved/user-saved.component';
import { HelpSectionComponent } from './pages/help-section/help-section.component';
import { HomePostComponent } from './components/home-post/home-post.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { MobileSearchComponent } from './pages/mobile-search/mobile-search.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '', component: HomeComponent,
    children:[
      {path: '', component: HomePostComponent},
      {path: "search/:search", component: SearchPageComponent},
      {path: "mobile-search", component: MobileSearchComponent}
    ]},
  {path: 'post/:id', component: PostPageComponent},
  {path: 'profile/:username', component: ProfileComponent,
    children:[
      {path: '', component: UserPostsComponent},
      {path: 'liked', component: UserLikedComponent},
      {path: 'saved', component: UserSavedComponent}
    ]},
  {path: "help", component: HelpSectionComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
