import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from './module/core/header/header.component';
import { FooterComponent } from './module/core/footer/footer.component';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AuthInterceptor } from './module/core/interceptors/auth.interceptor';
import { AuthExpiredInterceptor } from './module/core/interceptors/auth-expired.inteceptor';
import { BaseModalComponent } from './module/shared/modal/base-modal/base-modal.component';
import { LoginComponent } from './module/core/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './module/home/home.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { RegisterFormComponent } from './module/management/user/register-form/register-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ValidationErrorComponent } from './module/core/validation-error/validation-error.component';
import { UserListComponent } from './module/management/user/user-list/user-list.component';
import { ForbiddenComponent } from './module/core/forbidden/forbidden.component';
import { NotFoundComponent } from './module/core/not-found/not-found.component';
import { PasswordManagementFormComponent } from './module/management/user/password-management-form/password-management-form.component';
import { PasswordFormComponent } from './module/user/password-form/password-form.component';
import { ProfileFormComponent } from './module/user/profile-form/profile-form.component';
import { RoleListComponent } from './module/management/role/role-list/role-list.component';
import { UserRolesFormComponent } from './module/management/user/user-roles-form/user-roles-form.component';
import { RoleEditComponent } from './module/management/role/role-edit/role-edit.component';
import { RoleCreateComponent } from './module/management/role/role-create/role-create.component';
import { RoleFormComponent } from './module/management/role/role-form/role-form.component';
import { RoleInfoComponent } from './module/management/role/role-info/role-info.component';
import { UserInfoComponent } from './module/management/user/user-info/user-info.component';
import { DeviceFormComponent } from './module/hydroponics/device/device-form/device-form.component';
import { SensorTypeFormComponent } from './module/hydroponics/sensor-type/sensor-type-form/sensor-type-form.component';
import { SensorFormComponent } from './module/hydroponics/sensor/sensor-form/sensor-form.component';
import { SensorListComponent } from './module/hydroponics/sensor/sensor-list/sensor-list.component';
import { SensorCreateComponent } from './module/hydroponics/sensor/sensor-create/sensor-create.component';
import { SensorEditComponent } from './module/hydroponics/sensor/sensor-edit/sensor-edit.component';
import { SensorInfoComponent } from './module/hydroponics/sensor/sensor-info/sensor-info.component';
import { DeviceCreateComponent } from './module/hydroponics/device/device-create/device-create.component';
import { DeviceEditComponent } from './module/hydroponics/device/device-edit/device-edit.component';
import { DeviceInfoComponent } from './module/hydroponics/device/device-info/device-info.component';
import { SensorTypeCreateComponent } from './module/hydroponics/sensor-type/sensor-type-create/sensor-type-create.component';
import { SensorTypeEditComponent } from './module/hydroponics/sensor-type/sensor-type-edit/sensor-type-edit.component';
import { SensorTypeInfoComponent } from './module/hydroponics/sensor-type/sensor-type-info/sensor-type-info.component';
import { SensorTypeListComponent } from './module/hydroponics/sensor-type/sensor-type-list/sensor-type-list.component';
import { DeviceListComponent } from './module/hydroponics/device/device-list/device-list.component';
import { DeviceActionsComponent } from './module/hydroponics/device/device-list/device-actions/device-actions.component';
import { SensorActionsComponent } from './module/hydroponics/sensor/sensor-list/sensor-actions/sensor-actions.component';
import { SensorTypeActionsComponent } from './module/hydroponics/sensor-type/sensor-type-list/sensor-type-actions/sensor-type-actions.component';
import { HydroponicsNavigationDropdownComponent } from './module/hydroponics/hydroponics-navigation-dropdown/hydroponics-navigation-dropdown.component';
import { SensorVariableFormComponent } from './module/hydroponics/sensor/sensor-variable-form/sensor-variable-form.component';
import { DeviceInfoTemplateComponent } from './module/hydroponics/device/device-info-template/device-info-template.component';
import { SensorInfoTemplateComponent } from './module/hydroponics/sensor/sensor-info-template/sensor-info-template.component';
import { SensorTypeInfoTemplateComponent } from './module/hydroponics/sensor-type/sensor-type-info-template/sensor-type-info-template.component';
import { BackButtonComponent } from './module/shared/button/back-button/back-button.component';
import { TokenInfoComponent } from './module/notification/token/token-info/token-info.component';
import { NotificationNavigationDropdownComponent } from './module/notification/notification-navigation-dropdown/notification-navigation-dropdown.component';
import { TopicInfoComponent } from './module/notification/management/topic/topic-info/topic-info.component';
import { UserTopicFormComponent } from './module/notification/management/topic/user-topic-form/user-topic-form.component';
import { TopicInfoTemplateComponent } from './module/notification/management/topic/topic-info-template/topic-info-template.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BaseModalComponent,
    LoginComponent,
    HomeComponent,
    RegisterFormComponent,
    ValidationErrorComponent,
    UserListComponent,
    ForbiddenComponent,
    NotFoundComponent,
    PasswordManagementFormComponent,
    PasswordFormComponent,
    ProfileFormComponent,
    RoleListComponent,
    UserRolesFormComponent,
    RoleEditComponent,
    RoleCreateComponent,
    RoleFormComponent,
    RoleInfoComponent,
    UserInfoComponent,
    DeviceFormComponent,
    SensorTypeFormComponent,
    SensorFormComponent,
    SensorListComponent,
    SensorCreateComponent,
    SensorEditComponent,
    SensorInfoComponent,
    DeviceCreateComponent,
    DeviceEditComponent,
    DeviceInfoComponent,
    SensorTypeCreateComponent,
    SensorTypeEditComponent,
    SensorTypeInfoComponent,
    SensorTypeListComponent,
    DeviceListComponent,
    DeviceActionsComponent,
    SensorActionsComponent,
    SensorTypeActionsComponent,
    HydroponicsNavigationDropdownComponent,
    SensorVariableFormComponent,
    DeviceInfoTemplateComponent,
    SensorInfoTemplateComponent,
    SensorTypeInfoTemplateComponent,
    BackButtonComponent,
    TokenInfoComponent,
    NotificationNavigationDropdownComponent,
    TopicInfoComponent,
    UserTopicFormComponent,
    TopicInfoTemplateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: 'en',
    }),
    NgMultiSelectDropDownModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthExpiredInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
