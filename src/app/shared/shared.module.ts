import { NgModule } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { BreadcrumbsComponent } from "./breadcrumbs/breadcrumbs.component";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [HeaderComponent, SidebarComponent, BreadcrumbsComponent],
  imports: [RouterModule,CommonModule],
  exports: [HeaderComponent, SidebarComponent, BreadcrumbsComponent],
  providers: []
})
export class SharedModule {}
