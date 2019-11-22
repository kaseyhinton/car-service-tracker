import { LitElement, html, property, customElement, css } from 'lit-element';
import CSTStyles from '../../styles/cst-styles/cst-styles';

export class BasicSnackbar {
  _isComponent = false;
  open(message: string) {
    void message;
    console.warn('Missing import of cst-banner');
  }
}

export let CSTSnackbarSingleton = new BasicSnackbar();

@customElement('cst-snackbar')
export default class CSTSnackbarElement extends LitElement {
  @property({ type: String }) message: string = '';
  @property({ type: Boolean, reflect: true }) protected opened: boolean;
  _isComponent = true;

  private _resolve: { (value?: {} | PromiseLike<{}> | undefined): void; (): void };
  private _closeTimeoutHandle: number;

  constructor() {
    super();
    if (!CSTSnackbarSingleton || !CSTSnackbarSingleton._isComponent) {
      CSTSnackbarSingleton = this;
    } else {
      console.warn('More than one cst-banner-element has been used in this web application, consider removing one.');
    }
  }

  close() {
    if (!this.opened) {
      return;
    }

    this.opened = false;

    this._resolve();
  }

  open(message: string) {
    return new Promise(resolve => {
      clearTimeout(this._closeTimeoutHandle);

      if (message) {
        this.message = message;
      }

      this._resolve = resolve;
      this.opened = true;
    });
  }

  static styles = css`
    ${CSTStyles} :host {
      max-width: 280px;
      position: absolute;
      right: 16px;
      top: 71px;
    }

    @keyframes fadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }

    section {
      display: none;
      align-items: center;
      padding: 16px;
      border: 1px solid #eee;
      border-radius: 8px;
      background: #fff;
      box-shadow: 2px 2px 8px #eee;
    }

    section[opened] {
      animation: 0.3s fadeIn ease;
      display: flex;
    }

    a.button {
      user-select: none;
      margin: 0 0 0 16px;
    }
  `;

  render() {
    return html`
      <section ?opened=${this.opened}>
        <small>${this.message}</small>
        <a
          class="button"
          @click=${e => {
            e.preventDefault();
            clearTimeout(this._closeTimeoutHandle);
            this.close();
          }}
          >Ok</a
        >
      </section>
    `;
  }
}
