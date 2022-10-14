import { IDropdownSettings } from 'ng-multiselect-dropdown';

export const MULTISELECT: IDropdownSettings = {
  itemsShowLimit: 3,
  singleSelection: false,
  allowSearchFilter: false,
};
export const MULTISELECT_WITH_SEARCH: IDropdownSettings = {
  itemsShowLimit: 3,
  singleSelection: false,
  allowSearchFilter: true,
};
export const SINGLESELECT: IDropdownSettings = {
  singleSelection: true,
  allowSearchFilter: false,
};
export const SINGLESELECT_WITH_SEARCH: IDropdownSettings = {
  singleSelection: true,
  allowSearchFilter: true,
};
