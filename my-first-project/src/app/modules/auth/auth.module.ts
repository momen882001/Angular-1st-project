import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthComponent } from 'src/app/modules/auth/component/auth.component';
import { SharedModule } from '../shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    RouterModule.forChild([{ path: '', component: AuthComponent }]),
    SharedModule,
    FormsModule
  ],
})
export class AuthModule {}
