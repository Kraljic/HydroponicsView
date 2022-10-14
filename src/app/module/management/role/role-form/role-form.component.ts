import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { DropdownConfigService } from '../../../shared/dropdown/dropdown-config.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotificationService } from '../../../shared/notification/notification.service';
import { RoleManagementService } from '../role-management.service';
import { ErrorHandlerService } from '../../../core/error-handler/error-handler.service';
import { RoleCommand } from './role-command';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AuthorityDto } from '../../../core/user/authority.dto';
import { getRoleFormValidator } from './role-form.validator';
import { MULTISELECT_WITH_SEARCH } from '../../../shared/dropdown/dorpdown.config';
import { RoleDto } from '../../../core/user/role.dto';

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styles: [],
})
export class RoleFormComponent implements OnInit, OnChanges {
  @Input() formType: 'CREATE' | 'EDIT';
  @Input() roleCommand: RoleCommand;
  @Input() roleEdit: RoleDto;

  multiselectSettings: IDropdownSettings;

  formGroup: FormGroup;
  authoritiesList: AuthorityDto[] = [];
  authoritiesSelected: AuthorityDto[] = [];

  saving: boolean = false;

  constructor(
    private location: Location,
    private router: Router,
    private dropdownConfigService: DropdownConfigService,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private roleManagementService: RoleManagementService,
    private errorHandlerService: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.formGroup = getRoleFormValidator(this.formBuilder);

    this.dropdownConfigService
      .build('id', 'authority', MULTISELECT_WITH_SEARCH)
      .subscribe((settings) => (this.multiselectSettings = settings));

    this.roleManagementService
      .getAllAuthorities()
      .subscribe((authorities: AuthorityDto[]) => {
        this.authoritiesList = authorities;
        if (this.formType === 'EDIT') {
          this.authoritiesSelected = this.roleEdit?.authorities;
        }
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.formType === 'EDIT') {
      this.authoritiesSelected = this.roleEdit?.authorities;
    }
  }

  get f() {
    return this.formGroup.controls;
  }
  get model() {
    return this.roleCommand;
  }

  authoritiesOnItemSelect(e: any) {}

  save() {
    this.model.authoritiesId = this.authoritiesSelected?.map((a) => a.id) || [];

    (this.formType === 'CREATE'
      ? this.roleManagementService.creatRole(this.model)
      : this.roleManagementService.updateRole(this.roleEdit.id, this.model)
    ).subscribe(
      (newRole: RoleDto) => {
        this.router.navigate(['role-list']);
        this.notificationService.success('notification.success.roleSaved', {
          role: newRole.role,
        });
      },
      (err: any) => this.errorHandlerService.validationErrorHandler(err, this.f)
    );
  }

  cancle() {
    this.location.back();
  }
}
