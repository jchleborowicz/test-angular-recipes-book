import {Component} from '@angular/core';
import {StorageService} from '../../shared/storage.service';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private storageService: StorageService,
              public authService: AuthService,
              private router: Router) {
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

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
