import { css, customElement, html, LitElement, property } from 'lit-element';
import page from 'page';
import './components/cst-snackbar/cst-snackbar';
import './components/cst-header/cst-header';
import './components/cst-loading/cst-loading';
import './components/cst-loading/cst-loading-container';

import { NavigateEvent } from './utilities/events';
import CSTStyles from './styles/cst-styles/cst-styles';
import lazyLoad from './utilities/lazy-load';

@customElement('cst-app')
export class CSTAppElement extends LitElement {
  @property({ type: Boolean }) isLoading: boolean;
  @property({ type: String }) page: string | undefined;
  @property({ type: String }) currentView: 'add-vehicle' | 'vehicles' | 'vehicle' | 'not-found' | 'login' | 'create-account';
  @property({ type: String }) vehicleId: string;

  constructor() {
    super();
    this._installRoutes();
    this.addEventListener(NavigateEvent.eventName, (event: NavigateEvent) => page.show(event.detail));
    // First load make a call to get a jsonbox
    // store this in local storage
    // https://jsonbox.io/box_1f9996813bc8ce189395
    localStorage.setItem('apiUrl', 'https://jsonbox.io/box_1f9996813bc8ce189395');
  }

  private _installRoutes() {
    page.redirect('/', '/login');
    page('/vehicles', this._vehiclesRoute.bind(this));
    page('/vehicle/:id', this._vehicleRoute.bind(this));
    page('/add-vehicle', this._addVehicleRoute.bind(this));
    page('/login', this._loginRoute.bind(this));
    page('/create-account', this._createAccountRoute.bind(this));
    page('*', this._notFoundRoute.bind(this));
    page();
  }

  private _loginRoute() {
    this.currentView = 'login';
  }

  private _createAccountRoute() {
    this.currentView = 'create-account';
  }

  private _vehiclesRoute() {
    this.currentView = 'vehicles';
  }

  private _addVehicleRoute() {
    this.currentView = 'add-vehicle';
  }

  private _vehicleRoute(context) {
    this.currentView = 'vehicle';
    this.vehicleId = context.params['id'];
  }

  private _notFoundRoute() {
    this.currentView = 'not-found';
  }

  private _renderCurrentView(currentView: string) {
    switch (currentView) {
      case 'vehicles':
        return lazyLoad(
          import('./components/cst-list/cst-list.js'),
          html`
            <cst-list></cst-list>
          `
        );
      case 'vehicle':
        return lazyLoad(
          import('./components/cst-vehicle/cst-vehicle.js'),
          html`
            <cst-vehicle .vehicleId=${this.vehicleId}></cst-vehicle>
          `
        );
      case 'not-found':
        return lazyLoad(
          import('./components/cst-404/cst-404.js'),
          html`
            <cst-404></cst-404>
          `
        );
      case 'add-vehicle':
        return lazyLoad(
          import('./components/cst-add-vehicle/cst-add-vehicle.js'),
          html`
            <cst-add-vehicle></cst-add-vehicle>
          `
        );
      case 'login':
        return lazyLoad(
          import('./components/cst-login/cst-login.js'),
          html`
            <cst-login></cst-login>
          `
        );
      case 'create-account':
        return lazyLoad(
          import('./components/cst-create-account/cst-create-account.js'),
          html`
            <cst-create-account></cst-create-account>
          `
        );
      default:
        return html``;
    }
  }

  static styles = css`
    ${CSTStyles} :host {
      --app-primary-color: #86addb;
      --app-secondary-color: #b8b8b8;
      --app-text-color: #5c5c5c;
      --app-hover-color: #757575;
      display: flex;
      flex: 1 1 auto;
      flex-direction: column;
      min-height: 100vh;
    }

    loading-veil {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: #f9f9f9;
    }

    main-content {
      display: flex;
      flex-direction: column;
      flex: 1 1 auto;
      margin: 0 auto;
      max-width: 700px;
      width: 100%;
      transition: 0.3s ease;
      opacity: 1;
    }

    cst-header {
      opacity: 1;
    }

    [invisible] {
      opacity: 0;
      transition: none;
    }

    [hidden] {
      display: none;
    }
  `;

  render() {
    return html`
      <loading-veil ?hidden=${!this.isLoading}>
        <cst-loading-container ?hidden=${!this.isLoading}>
          <cst-loading size="24"></cst-loading>
        </cst-loading-container>
      </loading-veil>
      <cst-header ?invisible=${this.isLoading}></cst-header>
      <main-content ?invisible=${this.isLoading}>
        ${this._renderCurrentView(this.currentView)}
      </main-content>
      <cst-snackbar></cst-snackbar>
    `;
  }
}
