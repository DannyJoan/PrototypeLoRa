import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrototipoComponent } from './prototipo/prototipo.component';
import { LoginComponent } from './login/login.component';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ChartModule } from 'primeng/chart';
import { GMapModule } from 'primeng/gmap';
import { AgmCoreModule } from '@agm/core';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoraServicesService } from './lora-services.service';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    AppComponent,
    PrototipoComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ChartModule,
    GMapModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBrUwvX6xl0Yg0Nroae8tcHevp4NegJTw0'
    }),
    InputTextareaModule,
    FormsModule,
    HttpClientModule,
    TextFieldModule,
    MessagesModule,
    MessageModule,
    RippleModule,
    ToastModule
  ],
  providers: [HttpClient,
    LoraServicesService,
    MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
