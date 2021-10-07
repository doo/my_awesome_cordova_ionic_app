import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';

import ScanbotSdk, {
  DocumentScannerConfiguration
} from 'cordova-plugin-scanbot-sdk';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private SDK = ScanbotSdk.promisify();
  public imageFileUri: String = '';

  constructor(public sanitizer: DomSanitizer) {

  }

  async scanDocument(){
    const configs: DocumentScannerConfiguration = {
      orientationLockMode: 'PORTRAIT',
      multiPageEnabled: false,
      ignoreBadAspectRatio: true,
    };
 
    const result = await this.SDK.UI.startDocumentScanner({uiConfigs: configs});
    if (result.status === 'OK') {
      this.imageFileUri = this.sanitizeFileUri(result.pages[0].documentPreviewImageFileUri);
    }
  }

  convertFileUri(fileUri) {
    return (<any>window).Ionic.WebView.convertFileSrc(fileUri);
  }


  sanitizeFileUri(fileUri: string): string {
    // see https://ionicframework.com/docs/building/webview/#file-protocol
    const convertedUri = (window as any).Ionic.WebView.convertFileSrc(fileUri);
    // see https://angular.io/guide/security#bypass-security-apis
    return this.sanitizer.bypassSecurityTrustUrl(convertedUri) as string;
  }

}
