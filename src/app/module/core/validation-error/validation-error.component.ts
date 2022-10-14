import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

const MESSAGE_BASE = 'validation';

@Component({
  selector: 'app-validation-error',
  templateUrl: './validation-error.component.html',
  styles: [],
})
export class ValidationErrorComponent implements OnInit {
  @Input() control: AbstractControl;
  @Input() controlName: string;
  @Input() translationKey: string;

  errorMessages: string[] = [];

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.control.statusChanges.subscribe(() => {
      this.errorMessages = [];

      for (let errorIndex in this.control.errors) {
        let error = this.control.errors[errorIndex];
        if (typeof error === 'string') {
          this.errorMessages.push(error);
          continue;
        }
        this.getErrorMessage(errorIndex).subscribe((msg) => {
          msg = this.jsUcfirst(msg);
          this.errorMessages.push(msg);
        });
      }
    });
  }

  private getErrorMessage(error: string): Observable<any> {
    let key = MESSAGE_BASE + '.' + this.translationKey + '.' + error;

    let valuesMap = {
      controlName: this.controlName,
    };

    return this.translate.get(key, valuesMap).pipe(
      switchMap((msg) => {
        if (msg == key) {
          key = MESSAGE_BASE + '.' + error;
          return this.translate.get(key, valuesMap);
        }

        return of(msg);
      })
    );
  }
  private jsUcfirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
