import { Injectable, inject } from '@angular/core';
import { LDFlagValue } from 'launchdarkly-js-client-sdk';
import { InitLDClient } from './init-LDClient.service';
import { BehaviorSubject } from 'rxjs';

@Injectable()

export class FeatureFlagService {


  flag: any;
  private _flagObs = new BehaviorSubject<boolean>(false);
  flagObs$ = this._flagObs.asObservable();

  constructor(private launchDarkly: InitLDClient) {
    this.getFlag('ng-fest-2023-speakers-call');
  }



  private getFlag(flagKey: string, defaultValue: LDFlagValue = false) {
    this.setFlag(this.launchDarkly.ldClient.variation(flagKey, defaultValue));

    this.launchDarkly.ldClient.on(`change:${flagKey}`, (flagValue) => {
      this.setFlag(flagValue)
    });
  }

  private setFlag(flagValue: any) {
    this.flag = flagValue; // set static value
    this._flagObs.next(flagValue); // set streaming value
  }

  get value() {
    return this.flag;
  }
}
