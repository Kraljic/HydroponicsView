import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Observable, of } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';

const TRANSLATE_BASE = 'component.dropdown';
const TRANSTATE_KEYS = [
  TRANSLATE_BASE + '.selectAllText',
  TRANSLATE_BASE + '.unSelectAllText',
  TRANSLATE_BASE + '.searchPlaceholderText',
  TRANSLATE_BASE + '.noDataAvailablePlaceholderText',
];

@Injectable({
  providedIn: 'root',
})
export class DropdownConfigService {
  constructor(private translate: TranslateService) {}

  build(
    idField: string,
    textField: string,
    dropdownSettings: IDropdownSettings
  ): Observable<IDropdownSettings> {
    // Copy object
    dropdownSettings = Object.assign({}, dropdownSettings);

    dropdownSettings.idField = idField;
    dropdownSettings.textField = textField;

    return this.translate.get(TRANSTATE_KEYS).pipe(
      tap((values) => {
        dropdownSettings.selectAllText =
          values[TRANSLATE_BASE + '.selectAllText'];
        dropdownSettings.unSelectAllText =
          values[TRANSLATE_BASE + '.unSelectAllText'];
        dropdownSettings.searchPlaceholderText =
          values[TRANSLATE_BASE + '.searchPlaceholderText'];
        dropdownSettings.noDataAvailablePlaceholderText =
          values[TRANSLATE_BASE + '.noDataAvailablePlaceholderText'];
      }),
      switchMap(() => of(dropdownSettings))
    );
  }
}
