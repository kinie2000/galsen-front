import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

import { VerifcodeComponent } from "./verifcode.component";
import { SharedModule } from "src/app/shared/shared.module";

export const routes: Routes = [
  { path: "", component: VerifcodeComponent, pathMatch: "full" },
];

@NgModule({
  declarations: [VerifcodeComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class VerifdModule {}
