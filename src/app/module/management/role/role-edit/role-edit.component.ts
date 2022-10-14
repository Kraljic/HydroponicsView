import { Component, OnInit } from '@angular/core';
import { UserLoaderService } from '../../../core/error-handler/user-loader.service';
import { ActivatedRoute } from '@angular/router';
import { RoleDto } from '../../../core/user/role.dto';
import { RoleCommand } from '../role-form/role-command';
import { RoleManagementService } from '../role-management.service';
import { AuthorityDto } from '../../../core/user/authority.dto';
import { RoleLoaderService } from '../../../core/error-handler/role-loader.service';

@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styles: [],
})
export class RoleEditComponent implements OnInit {
  role: RoleDto;
  roleCommand: RoleCommand;

  constructor(
    private roleLoaderService: RoleLoaderService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.roleLoaderService
      .tryLoadRoleFromUrl(this.activatedRoute, ['role-list'])
      .subscribe((role: RoleDto) => {
        this.role = role;

        this.roleCommand = new RoleCommand();
        this.roleCommand.role = role.role;
      });
  }
}
