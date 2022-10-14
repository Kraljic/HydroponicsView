import { Component, OnInit } from '@angular/core';
import { RoleCommand } from '../role-form/role-command';

@Component({
  selector: 'app-role-create',
  templateUrl: './role-create.component.html',
  styles: [],
})
export class RoleCreateComponent implements OnInit {
  roleCommand: RoleCommand = new RoleCommand();

  constructor() {}

  ngOnInit(): void {}
}
