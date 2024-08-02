import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Subscription } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    SidebarComponent,
    MatSidenavModule,
    MatToolbarModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  title = 'fastkart-admin';
  sidebarOpened: boolean = false;
  sidebarMode: 'side' | 'over' = 'side';
  private breakpointSubscription!: Subscription;

  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
    // Initial setup: Hide sidebar
    this.sidebarMode = 'over';
    this.sidebarOpened = false;
  }

  ngAfterViewInit() {
    // Ensure the sidebar is shown after the page has fully loaded
    setTimeout(() => {
      this.initializeSidebarState();
    }, 100); // Adjust the delay if needed
  }

  private initializeSidebarState() {
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

  private updateSidebarState(isSmallScreen: boolean) {
    if (isSmallScreen) {
      this.sidebarMode = 'over';
      this.sidebarOpened = false; // Hide sidebar on small screens
      localStorage.setItem('sidebarOpened', 'false');
    } else {
      this.sidebarMode = 'side';
      this.sidebarOpened = localStorage.getItem('sidebarOpened') === 'true'; // Restore sidebar state for large screens
    }
  }

  sidebarToggler() {
    this.sidebarOpened = !this.sidebarOpened;
    localStorage.setItem('sidebarOpened', this.sidebarOpened.toString());
  }

  ngOnDestroy() {
    if (this.breakpointSubscription) {
      this.breakpointSubscription.unsubscribe();
    }
  }
}
