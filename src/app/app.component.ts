import { Component, OnDestroy, OnInit, AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Subscription } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { FooterComponent } from './layout/footer/footer.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterOutlet,
    HeaderComponent,
    SidebarComponent,
    MatSidenavModule,
    MatToolbarModule,
    FooterComponent,
    NgIf
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  title = 'fastkart-admin';
  sidebarOpened: boolean = false;
  sidebarMode: 'side' | 'over' = 'side';
  breakpointSubscription!: Subscription;
  showHeaderFooterSidebar: boolean = true;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit() {
    // Initial setup: Hide sidebar
    this.sidebarMode = 'over';
    this.sidebarOpened = false;

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Logic to determine if header, footer, and sidebar should be shown
        this.showHeaderFooterSidebar = !this.router.url.startsWith('/sign-up') && !this.router.url.startsWith("/sign-in");
      }
    });
  }

  ngAfterViewInit() {
    // Initialize the sidebar state after the view has been initialized
    this.breakpointSubscription = this.breakpointObserver.observe([
      Breakpoints.Handset
    ]).subscribe(result => {
      this.updateSidebarState(result.matches);
      this.cdr.detectChanges(); // Manually trigger change detection
    });

    // Ensure the sidebar is shown after the page has fully loaded
    setTimeout(() => {
      this.initializeSidebarState();
      this.cdr.detectChanges(); // Manually trigger change detection
    }, 100); // Adjust the delay if needed
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }

  private initializeSidebarState() {
    if (this.isBrowser()) {
      const storedSidebarState = localStorage.getItem('sidebarOpened');
      const isSmallScreen = window.innerWidth <= 991;

      if (isSmallScreen) {
        this.sidebarMode = 'over';
        this.sidebarOpened = false; // Hide sidebar for small screens
      } else {
        this.sidebarMode = 'side';
        this.sidebarOpened = storedSidebarState === 'true'; // Restore sidebar state for large screens
      }
    }
  }

  private updateSidebarState(isSmallScreen: boolean) {
    if (this.isBrowser()) {
      if (isSmallScreen) {
        this.sidebarMode = 'over';
        this.sidebarOpened = false; // Hide sidebar on small screens
        localStorage.setItem('sidebarOpened', 'false');
      } else {
        this.sidebarMode = 'side';
        this.sidebarOpened = localStorage.getItem('sidebarOpened') === 'true'; // Restore sidebar state for large screens
      }
    }
  }

  sidebarToggler() {
    if (this.isBrowser()) {
      this.sidebarOpened = !this.sidebarOpened;
      localStorage.setItem('sidebarOpened', this.sidebarOpened.toString());
    }
  }

  ngOnDestroy() {
    if (this.breakpointSubscription) {
      this.breakpointSubscription.unsubscribe();
    }
  }
}
