import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import { ServiceLogComponent } from './components/service-log/service-log.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    DashboardComponent,
    ChatbotComponent,
    ServiceLogComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'BarangayNav - Transparent Barangay Services';
}
