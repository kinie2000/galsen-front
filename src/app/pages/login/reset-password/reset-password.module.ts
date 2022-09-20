import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

import { ResetPasswordComponent } from "./reset-password.component";
import { SharedModule } from "src/app/shared/shared.module";

export const routes: Routes = [
  { path: "", component: ResetPasswordComponent, pathMatch: "full" },
];

@NgModule({
  declarations: [ResetPasswordComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class ResetPasswordModule {}
