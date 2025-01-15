import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { AppService } from './app/services/app.service'; 

// Bootstrap the application with HTTP client, router, and the AuthInterceptor
bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes), 
    AppService.configureHttpInterceptor() 
  ]
}).catch((err) => console.error(err));
