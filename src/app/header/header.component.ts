import {Component} from '@angular/core';
import {StorageService} from '../services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private storageService: StorageService) {
  }

  saveData() {
    this.storageService.saveData()
      .subscribe(
        () => alert('Data has been saved'),
        error => {
          console.log(error);
          alert('Unable to load ingredients: ' + error);
        }
      );
  }

  fetchData() {
    this.storageService.fetchData()
      .subscribe(
        () => alert('Data has been loaded'),
        (error) => alert('Error when saving recipes: ' + error)
      );
  }
}
