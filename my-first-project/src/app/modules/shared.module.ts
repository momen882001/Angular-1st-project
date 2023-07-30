import { NgModule } from "@angular/core";
import { DropdownDirective } from "../shared/dropdown.directive";
import { LoadingComponent } from "../shared/Loading-spinner/loading.component";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations : [
    DropdownDirective,
    LoadingComponent
  ],
  imports : [
    CommonModule
  ],
  exports : [
    DropdownDirective,
    LoadingComponent,
    CommonModule
  ]
})
export class SharedModule {

}

// shared component
