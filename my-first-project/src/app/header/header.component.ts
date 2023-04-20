import { Component, EventEmitter , Output } from "@angular/core";

@Component({
    selector : "app-header",
    templateUrl : "./header.component.html"
})

export class HeaderComponent {

  @Output() NavigationService = new EventEmitter<string>()

  onSelect(feature : string) {
      this.NavigationService.emit(feature);
  }

}
