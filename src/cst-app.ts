import { css, customElement, html, LitElement, property } from 'lit-element';
import page from 'page';
import { displayFlex, vertical, displayNone, selfCenter } from '@collaborne/lit-flexbox-literals';
import '@amber-ds/components/progress';
import './components/cst-banner/cst-banner';
import './components/cst-header/cst-header';
import './components/cst-404/cst-404';
import './components/cst-loading/cst-loading';

import { NavigateEvent } from './events';
import CSTStyles from './components/cst-styles/cst-styles';

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
      }, 300);
    }
  }

  static styles = css`
    ${CSTStyles}
    :host {
      --app-primary-color: #86addb;
      --app-secondary-color: #b8b8b8;
      --app-text-color: #5c5c5c;
      overflow: hidden;
      ${displayFlex}
      ${vertical}
    }

    main-content {
      ${displayFlex}
      ${vertical}
      margin: 0 auto;
      max-width: 900px;
      width: 100%;
    }

    cst-loading {
      ${selfCenter}
      margin-top: 24px;
    }

    [hidden] {
      ${displayNone}
    }
  `;

  render() {
    return html`
      <main class="wrapper">
        <cst-header></cst-header>
        <main-content>
          ${this.isLoading
            ? html`
                <cst-loading></cst-loading>
              `
            : html`
                <car-list ?hidden=${this.page !== '/'} ?isActive=${this.page === '/'}></car-list>
                <cst-404 ?hidden=${this.page !== '404'}></cst-404>
              `}
        </main-content>

        <cst-banner></cst-banner>
      </main>
    `;
  }
}
