import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatIconModule } from '@angular/material/icon'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { LateralHomebarComponent } from './components/lateral-homebar/lateral-homebar.component';
import { SinglePostComponent } from './components/single-post/single-post.component';
import { ProfileBarComponent } from './components/profile-bar/profile-bar.component';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { PostPageComponent } from './pages/post-page/post-page.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoadingComponent } from './components/loading/loading.component';
import { SwitchComponent } from './components/switch/switch.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { LateralProfileBarComponent } from './components/lateral-profile-bar/lateral-profile-bar.component';
import { ObserverComponent } from './components/observer/observer.component';
import { SearchComponent } from './components/search/search.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { MobileMenuComponent } from './components/mobile-menu/mobile-menu.component';
import { MobileSearchComponent } from './pages/mobile-search/mobile-search.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { SuggestedTagsComponent } from './components/suggested-tags/suggested-tags.component';
import { LinkifyPipe } from './utils/linkify/linkify.component';
import { WithCredentialsInterceptor } from './interceptors/WithCredentialsInterceptor';
import { SuggestedProfilesComponent } from './components/suggested-profiles/suggested-profiles.component';
import { ProfileListComponent } from './components/profile-list/profile-list.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { ReccomendedPostsViewComponent } from './components/reccomended-posts-view/reccomended-posts-view.component';
import { UserPostsComponent } from './components/user-posts/user-posts.component';
import { LikedUserPostsComponent } from './components/liked-user-posts/liked-user-posts.component';
import { SavedUserPostsComponent } from './components/saved-user-posts/saved-user-posts.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    LateralHomebarComponent,
    SinglePostComponent,
    ProfileBarComponent,
    ProfileCardComponent,
    PostFormComponent,
    PostPageComponent,
    ProfileComponent,
    LoadingComponent,
    SwitchComponent,
    UserCardComponent,
    LateralProfileBarComponent,
    ObserverComponent,
    SearchComponent,
    SearchPageComponent,
    MobileMenuComponent,
    MobileSearchComponent,
    NotificationsComponent,
    SuggestedTagsComponent,
    LinkifyPipe,
    SuggestedProfilesComponent,
    ProfileListComponent,
    PostListComponent,
    ReccomendedPostsViewComponent,
    UserPostsComponent,
    LikedUserPostsComponent,
    SavedUserPostsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: WithCredentialsInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
