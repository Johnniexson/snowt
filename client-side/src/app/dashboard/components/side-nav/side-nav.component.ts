import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user';

const MAX_WIDTH_BREAKPOINT = 720;
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  userData: User = null;

  private mediaMatcher: MediaQueryList = matchMedia(
    `(max-width : ${MAX_WIDTH_BREAKPOINT}px)`
  );
  links = [
    {
      name: 'Profile',
      url: 'profile'
    },
    {
      name: 'Contacts',
      url: 'contacts'
    },
    {
      name: 'Notes',
      url: 'notes'
    }
  ];

  constructor(zone: NgZone, private authService: AuthService) {
    this.mediaMatcher.addListener(nql => {
      zone.run(() => (this.mediaMatcher = nql));
    });
  }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(data => {
      this.userData = data;
    });
  }

  isScreenSmall() {
    return this.mediaMatcher.matches;
  }
}
