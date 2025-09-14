// src/main.ts
import 'zone.js';  // ✅ enable Angular's change detection system

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';


bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));