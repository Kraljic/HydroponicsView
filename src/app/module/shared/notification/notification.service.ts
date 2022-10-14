import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(
    private toastrService: ToastrService,
    private translateService: TranslateService
  ) {}

  success(
    key: string = 'notification.success.default',
    interpolateParams: any = {},
    ms: number = 2000
  ): Promise<any> {
    this.translateService.get(key, interpolateParams).subscribe((msg) => {
      this.toastrService.success(msg);
    });
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  info(
    key: string,
    interpolateParams: any = {},
    ms: number = 2000
  ): Promise<any> {
    this.translateService.get(key, interpolateParams).subscribe((msg) => {
      this.toastrService.info(msg);
    });
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  error(
    key: string = 'notification.error.default',
    interpolateParams: any = {},
    ms: number = 2000
  ): Promise<any> {
    this.translateService.get(key, interpolateParams).subscribe((msg) => {
      this.toastrService.error(msg);
    });
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
