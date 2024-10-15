import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { provideHttpClient } from '@angular/common/http';
import { getStorage, provideStorage } from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideFirebaseApp(() =>
      initializeApp(environment.firebase)
    ),
    provideFirestore(() => getFirestore()), provideFirebaseApp(() => initializeApp({"projectId":"simulacro-parcial-3c101","appId":"1:629840210265:web:337cd3ab6c6b4cd4b30448","storageBucket":"simulacro-parcial-3c101.appspot.com","apiKey":"AIzaSyCnA1eL0plexugXhhTczm45KeX07U5SCSI","authDomain":"simulacro-parcial-3c101.firebaseapp.com","messagingSenderId":"629840210265"})), provideStorage(() => getStorage()),
  ],
};
