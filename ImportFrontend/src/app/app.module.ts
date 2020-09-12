import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { EditModeDirective } from './editable/edit-mode.directive';
import { ViewModeDirective } from './editable/view-mode.directive';
import { EditableOnEnterDirective } from './editable/editable-on-enter.directive';
import { FocusableDirective } from './login/focusable.directive';
import { EditableComponent } from './editable/editable.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EditModeDirective,
    ViewModeDirective,
    EditModeDirective,
    EditableOnEnterDirective,
    FocusableDirective,
    EditableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
