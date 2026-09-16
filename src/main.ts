import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { authInterceptor } from './app/core/auth/auth.interceptor';
import { loadRuntimeConfig } from './app/core/config/runtime-config';

// Load /config.json (API base URL) before anything makes an HTTP call.
loadRuntimeConfig()
  .then(() =>
    bootstrapApplication(AppComponent, {
      providers: [
        provideRouter(routes),
        provideAnimations(),
        provideHttpClient(withInterceptors([authInterceptor])),
      ],
    }),
  )
  .catch((err) => console.error(err));
