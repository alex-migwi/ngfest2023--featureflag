import { Component } from '@angular/core';
import { FeatureFlagService } from './services/feature-flag.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    FeatureFlagService
  ]
})
export class AppComponent {

  title = 'ngfest2023';

  flagIsOn: boolean = false;

  flagIsOnObs$ = this.featureFlagService.flagObs$;

  constructor(private featureFlagService: FeatureFlagService) {}

  ngOnInit() {
    this.flagIsOn = this.featureFlagService.value;
  }

}
