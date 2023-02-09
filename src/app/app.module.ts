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
import { PostsComponent } from './components/posts/posts.component';
import { SinglePostComponent } from './components/single-post/single-post.component';
import { TokenInterceptor } from './token-interceptor';
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
import { UserPostsComponent } from './components/user-posts/user-posts.component';
import { UserLikedComponent } from './components/user-liked/user-liked.component';
import { UserSavedComponent } from './components/user-saved/user-saved.component';
import { HelpSectionComponent } from './pages/help-section/help-section.component';
import { MentionComponent } from './components/mention/mention.component';
import { TagPageComponent } from './components/tag-page/tag-page.component';
import { HomePostComponent } from './components/home-post/home-post.component';
import { SearchComponent } from './components/search/search.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { MobileMenuComponent } from './components/mobile-menu/mobile-menu.component';
import { MobileSearchComponent } from './pages/mobile-search/mobile-search.component';
import { NotificationsComponent } from './components/notifications/notifications.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    LateralHomebarComponent,
    PostsComponent,
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
    UserPostsComponent,
    UserLikedComponent,
    UserSavedComponent,
    HelpSectionComponent,
    MentionComponent,
    TagPageComponent,
    HomePostComponent,
    SearchComponent,
    SearchPageComponent,
    MobileMenuComponent,
    MobileSearchComponent,
    NotificationsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
