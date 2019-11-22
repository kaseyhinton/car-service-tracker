import { css, customElement, html, LitElement, property } from 'lit-element';
import page from 'page';
import './components/cst-snackbar/cst-snackbar';
import './components/cst-header/cst-header';

import { NavigateEvent } from './utilities/events';
import CSTStyles from './styles/cst-styles/cst-styles';
import lazyLoad from './utilities/lazy-load';

@customElement('cst-app')
export class CSTAppElement extends LitElement {
  @property({ type: String }) page: string | undefined;
  @property({ type: String }) currentView: 'add-vehicle' | 'vehicles' | 'vehicle' | 'not-found';
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
    page.redirect('/', '/vehicles');
    page('/vehicles', this._vehiclesRoute.bind(this));
    page('/vehicle/:id', this._vehicleRoute.bind(this));
    page('/add-vehicle', this._addVehicleRoute.bind(this));
    page('*', this._notFoundRoute.bind(this));
    page();
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
      flex-direction: column;
    }

    main-content {
      display: flex;
      flex-direction: column;
      margin: 0 auto;
      max-width: 900px;
      width: 100%;
      background: #fff;
    }

    [hidden] {
      display: none;
    }
  `;

  render() {
    return html`
      <main class="wrapper">
        <cst-header></cst-header>
        <main-content>
          ${this._renderCurrentView(this.currentView)}
        </main-content>
        <cst-snackbar></cst-snackbar>
      </main>
    `;
  }
}
