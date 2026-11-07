import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withNavigationErrorHandler } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { authInterceptor } from './app/core/auth/auth.interceptor';
import { loadRuntimeConfig } from './app/core/config/runtime-config';
import { reloadOnNewVersion } from './app/core/navigation/reload-on-new-version';

// Load /config.json (API base URL) before anything makes an HTTP call.
loadRuntimeConfig()
  .then(() =>
    bootstrapApplication(AppComponent, {
      providers: [
        // After a deploy, a tab still running the old version reloads into the new one
        // instead of silently ignoring clicks on pages it hasn't opened yet.
        provideRouter(routes, withNavigationErrorHandler(reloadOnNewVersion)),
        provideAnimations(),
        provideHttpClient(withInterceptors([authInterceptor])),
      ],
    }),
  )
  .catch((err) => console.error(err));
