import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ExerciseLogComponent } from './components/exercise-log/exercise-log.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LogsService } from './services/logs.service';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    ExerciseLogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [LogsService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
