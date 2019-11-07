import { css, customElement, html, LitElement, property } from 'lit-element';
import page from 'page';
import { displayFlex, vertical, displayNone, selfCenter } from '@collaborne/lit-flexbox-literals';
import '@amber-ds/components/progress';

@customElement('cst-app')
export class CSTAppElement extends LitElement {
  @property({ type: Boolean }) isLoading: boolean = true;
  @property({ type: String }) page: string | undefined;

  firstUpdated() {
    setTimeout(() => {
      page('/', () => {
        this.pageChanged('/');
      });
      page.start();
    }, 600);
  }

  async pageChanged(mainPage: string) {
    this.page = mainPage;
    console.log(this.page);
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
    } finally {
      this.isLoading = false;
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
        <div class="row">
          <div class="col-2"></div>
          <main-content class="col-8">
            ${this.isLoading
              ? html`
                  <amber-progress></amber-progress>
                `
              : html`
                  <car-list ?hidden=${this.page !== '/'} ?isActive=${this.page === '/'}></car-list>
                `}
          </main-content>
          <div class="col-2"></div>
        </div>
      </div>
    `;
  }
}
