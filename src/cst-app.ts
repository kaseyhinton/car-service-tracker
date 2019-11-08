import { css, customElement, html, LitElement, property } from 'lit-element';
import page from 'page';
import { displayFlex, vertical, displayNone, selfCenter } from '@collaborne/lit-flexbox-literals';
import '@amber-ds/components/progress';
import './components/cst-banner/cst-banner';
import './components/cst-header/cst-header';
import './components/cst-404/cst-404';
import { NavigateEvent } from './events';

@customElement('cst-app')
export class CSTAppElement extends LitElement {
  @property({ type: Boolean }) isLoading: boolean = true;
  @property({ type: String }) page: string | undefined;

  firstUpdated() {
    this.addEventListener(NavigateEvent.eventName, (event: NavigateEvent) => page.show(event.detail));

    page('/', () => {
      this.pageChanged('/');
    });

    page('*', () => {
      this.pageChanged('404');
    });

    page.start();
  }

  async pageChanged(mainPage: string) {
    this.page = mainPage;
    this.isLoading = true;

    try {
      switch (mainPage) {
        case '/':
          await import('./components/car-list/car-list.js');
          break;
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    } catch (error) {
      console.warn(error);
      this.pageChanged('404');
    } finally {
      setTimeout(() => {
        this.isLoading = false;
      }, 600);
    }
  }

  static styles = css`
    :host {
      --app-primary-color: #eb6400;
      --app-secondary-color: #b8b8b8;
      --app-text-color: #5c5c5c;
      overflow: hidden;
      ${displayFlex}
      ${vertical}
    }

    main-content {
      ${displayFlex}
      ${vertical}
    }

    amber-progress {
      ${selfCenter}
      margin-top: 24px;
    }

    [hidden] {
      ${displayNone}
    }
  `;

  render() {
    return html`
      <link href="https://unpkg.com/@amber-ds/visual@1.0.1/dist/index.css" rel="stylesheet" />

      <div class="container-fluid">
        <cst-header></cst-header>
        <div class="row">
          <div class="col-1"></div>
          <main-content class="col-10">
            ${this.isLoading
              ? html`
                  <amber-progress></amber-progress>
                `
              : html`
                  <car-list ?hidden=${this.page !== '/'} ?isActive=${this.page === '/'}></car-list>
                  <cst-404 ?hidden=${this.page !== '404'}></cst-404>
                `}
          </main-content>
          <div class="col-1"></div>
        </div>
      </div>

      <cst-banner></cst-banner>
    `;
  }
}
