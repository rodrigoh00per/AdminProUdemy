import { NgModule } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { BreadcrumbsComponent } from "./breadcrumbs/breadcrumbs.component";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { PipesModule } from "../pipes/pipes.module";
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';

@NgModule({
  declarations: [HeaderComponent, SidebarComponent, BreadcrumbsComponent,ModalUploadComponent],
  imports: [RouterModule, CommonModule, PipesModule],
  exports: [HeaderComponent, SidebarComponent, BreadcrumbsComponent,ModalUploadComponent],
  providers: []
})
export class SharedModule {}
