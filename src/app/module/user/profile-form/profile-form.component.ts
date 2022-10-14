import { Component, OnInit } from '@angular/core';
import { ProfileCommand } from './profile-command';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { NotificationService } from '../../shared/notification/notification.service';
import { UserService } from '../../core/user/user.service';
import { getProfileFormValidator } from './profile.validator';
import { ProfileDto } from '../../core/user/profile.dto';
import { ErrorHandlerService } from '../../core/error-handler/error-handler.service';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styles: [],
})
export class ProfileFormComponent implements OnInit {
  profileCommand: ProfileCommand;

  formGroup: FormGroup;

  saving: boolean = false;

  constructor(
    private location: Location,
    private router: Router,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private userService: UserService,
    private errorHandlerService: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.profileCommand = new ProfileCommand();

    this.userService.getProfile().subscribe((profile: ProfileDto) => {
      this.profileCommand.firstName = profile.firstName;
      this.profileCommand.lastName = profile.lastName;
      console.log(profile);
    });

    this.formGroup = getProfileFormValidator(this.formBuilder);
  }

  get f() {
    return this.formGroup.controls;
  }
  get model() {
    return this.profileCommand;
  }

  save() {
    this.userService.updateProfile(this.model).subscribe(
      () => {
        this.router.navigate(['main']);
        this.notificationService.success('notification.success.editProfile');
      },
      (err: any) => this.errorHandlerService.validationErrorHandler(err, this.f)
    );
  }

  cancle() {
    this.location.back();
  }
}
