import { css, customElement, html, LitElement, property } from 'lit-element';
import page from 'page';
import './components/cst-snackbar/cst-snackbar';
import './components/cst-header/cst-header';
import './components/cst-loading/cst-loading';

import { NavigateEvent } from './utilities/events';
import CSTStyles from './styles/cst-styles/cst-styles';
import lazyLoad from './utilities/lazy-load';

@customElement('cst-app')
export class CSTAppElement extends LitElement {
  @property({ type: Boolean }) isLoading: boolean = true;
  @property({ type: String }) page: string | undefined;
  @property({ type: String }) currentView: 'vehicles' | 'vehicle' | 'not-found' = 'vehicles';
  @property({ type: Number }) vehicleId: number;

  constructor() {
    super();
    this._installRoutes();
    this.addEventListener(NavigateEvent.eventName, (event: NavigateEvent) => page.show(event.detail));
    window.addEventListener('lazy-load-complete', () => {
      this.isLoading = false;
    });
  }

  private _installRoutes() {
    page.redirect('/', '/vehicles');
    page('/vehicles', this._vehiclesRoute.bind(this));
    page('/vehicle/:id', this._vehicleRoute.bind(this));
    page('*', this._notFoundRoute.bind(this));
    page();
  }

  private _vehiclesRoute() {
    this.isLoading = true;
    this.currentView = 'vehicles';
  }

  private _vehicleRoute(context) {
    this.isLoading = true;
    this.currentView = 'vehicle';
    const vehicleId: string = context.params['id'];
    this.vehicleId = Number(vehicleId);
  }

  private _notFoundRoute() {
    this.isLoading = true;
    this.currentView = 'not-found';
  }

  private _renderCurrentView() {
    switch (this.currentView) {
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

    cst-loading {
      align-self: center;
      margin-top: 24px;
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
          <cst-loading ?hidden=${!this.isLoading}></cst-loading>
          <div ?hidden=${this.isLoading}>
            ${this._renderCurrentView()}
          </div>
        </main-content>
        <cst-snackbar></cst-snackbar>
      </main>
    `;
  }
}
