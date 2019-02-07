import { Component, OnInit, EventEmitter, Output, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

const MAX_WIDTH_BREAKPOINT = 720;
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  private mediaMatcher:MediaQueryList = matchMedia(`(max-width : ${MAX_WIDTH_BREAKPOINT}px)`)

  @Output()
  toggleSidenav = new EventEmitter<void>();
  constructor(private router: Router,
              private authService: AuthService,
              private zone: NgZone) {
                this.mediaMatcher.addListener((nql)=> {
                  zone.run(() => this.mediaMatcher = nql)
                })
              }

  loginBtnHandler() {
    this.router.navigate(['login']);
  }
  registerBtnHandler() {
    this.router.navigate(['register']);
  }
  ngOnInit() {}

  isScreenSmall(){
    return this.mediaMatcher.matches;
  }
}
