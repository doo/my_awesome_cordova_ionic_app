import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import ScanbotSdk, {
  ScanbotSDKConfiguration
} from 'cordova-plugin-scanbot-sdk';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  private SDK = ScanbotSdk.promisify();

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.initScanbotSdk();
    });
  }

  async initScanbotSdk() {
    const config: ScanbotSDKConfiguration = {
      loggingEnabled: true,
      licenseKey: '', // TODO add your Scanbot SDK license key here
    };
    try {
      const result = await this.SDK.initializeSdk(config);
      console.log(result);
    } catch (e) {
      console.error(e);
    }
  }

}

