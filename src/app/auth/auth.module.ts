import {NgModule} from '@angular/core';
import {SignupComponent} from './sigunup/signup.component';
import {SigninComponent} from './sigunin/signin.component';
import {FormsModule} from '@angular/forms';
import {AuthRoutingModule} from './auth-routing.module';

@NgModule({
  declarations: [
    SignupComponent,
    SigninComponent
  ],
  imports: [
    FormsModule,
    AuthRoutingModule
  ]
})
export class AuthModule {
}
