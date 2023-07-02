import { Injectable, OnDestroy, inject } from '@angular/core';
import * as LaunchDarkly from 'launchdarkly-js-client-sdk';
import { LDFlagValue } from 'launchdarkly-js-client-sdk';
import { Observable, Subject, of, distinctUntilChanged, tap, switchMap, takeUntil, catchError } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InitLDClient {


  ldClient!: LaunchDarkly.LDClient;


  // Set up the context properties. This context should appear on your
  // LaunchDarkly contexts dashboard soon after you run the demo.
  private context = {
    kind: 'user',
    key: 'ngFest2023',
    name: 'Alex M',
    custom: {
      latlong: "someval",
      country: "Kenya"
    }
  } as LaunchDarkly.LDContext;


  initialize() {
    this.ldClient = LaunchDarkly.initialize('add your own client id here', this.context);

    // using Promise then() and catch() handlers
    return this.ldClient.waitForInitialization().then(() => {
      return true;
    }).catch(err => {
      console.error('Launch Darkly init failed');
      // Or log the error somewhere else
      return true;
    });
  }
}
